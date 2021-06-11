import * as THREE from "three"
import Tweakpane from "tweakpane"

import Skeleton from "./Skeleton"
import Clipboard from "./Clipboard"
import Foreground from "./Foreground"
import Background from "./Background"

import { OrbitControls } from "../../CustomControls"

import raf from "~singletons/RAF"
import MouseController from "~/singletons/MouseController"
import store from "~/store"

import { ThreeGroup } from "~/interfaces/Three"
import gsap from "gsap"

import AudioController from '~/singletons/AudioController'


let coef = 0
const params = {
  //2 is 0.5 seconds
  fresnelSpeed: 4,

  fresnelIntensity: 0.3,
}

let minPan = new THREE.Vector3(0, -5, 0)
let maxPan = new THREE.Vector3(0, 3.5, 0)
let _v = new THREE.Vector3()

let dragForce = 0

const AI_CAMERA_VALUES = [3.5, 0.5, 0.5, 0, 3]

export default class Radio implements ThreeGroup {
  group: THREE.Group

  raycaster: THREE.Raycaster
  mouse: THREE.Vector2
  camera: THREE.PerspectiveCamera
  controls: OrbitControls

  patientFileOpened: boolean

  selectedObjects: THREE.Object3D[]
  pane: Tweakpane | null
  renderTarget: THREE.WebGLRenderTarget

  selectedMesh: null | THREE.Mesh

  currentIntersect: any
  mouseDown: boolean
  isDragging: boolean

  gameEnded: boolean

  skeletonScene: THREE.Scene
  renderer: any
  progress: number

  aiUsed: number
  goodAnswers: number

  clock: THREE.Clock

  gameRunning: boolean

  constructor(
    camera: THREE.PerspectiveCamera,
    raycaster: THREE.Raycaster,
    mouse: THREE.Vector2,
    controls: OrbitControls,
    pane: Tweakpane | null,
    renderer: THREE.Renderer,
    clock: THREE.Clock
  ) {
    this.group = new THREE.Group()
    this.controls = controls

    this.aiUsed = 0
    this.goodAnswers = 0

    this.patientFileOpened = false

    this.renderer = renderer
    this.renderTarget = new THREE.WebGLMultisampleRenderTarget(
      window.innerWidth,
      window.innerHeight
    )

    this.controls.minDistance = 5
    this.controls.maxDistance = 30
    this.controls.enabled = false
    // this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.gameStarted = false

    this.controls.minPolarAngle = Math.PI * 0.1
    this.controls.maxPolarAngle = Math.PI * 0.9

    this.pane = pane

    this.gameEnded = false

    this.raycaster = raycaster
    this.camera = camera
    this.mouse = mouse

    this.clock = clock

    this.skeletonScene = new THREE.Scene()
    this.selectedObjects = []
    this.currentIntersect = null

    this.selectedMesh = null

    this.progress = 0

    this.mouseDown = false
    this.isDragging = false

    this.gameRunning = false

    this.controls.addEventListener("start", () => {
      this.mouseDown = true
      dragForce = 0
    })

    this.controls.addEventListener("change", (e) => {
      dragForce += 1
      if (this.mouseDown && dragForce > 15) {
        this.isDragging = true

        MouseController.raw.current.x = e.target.mouse.x
        MouseController.raw.current.y = e.target.mouse.y

        // MouseController.mouseVec2Viewport.x

        // if (this.currentIntersect) {

        //     this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 0.5
        //     // this.currentIntersect = null
        //     // coef
        // }
      }

      //doesn't work in the update
      if (this.controls.enabled) {
        _v.copy(this.controls.target)
        this.controls.target.clamp(minPan, maxPan)
        _v.sub(this.controls.target)
        this.camera.position.sub(_v)
      }
    })

    this.controls.addEventListener("end", () => {
      // this.mouseDown = false
      dragForce = 0
      this.isDragging = false
    })

    window.addEventListener("pointerup", this.mouseup)
  }

  mouseup = () => {
    dragForce = 0
    this.mouseDown = false
    this.isDragging = false
  };

  init() {
    raf.subscribe("radioUpdate", this.update)
    this.camera.position.set(0, 0, 25)
    this.controls.saveState()

    Skeleton.init(this.skeletonScene)

    this.group.add(Background.mesh)
    Foreground.init(this.renderTarget, this.renderer.getPixelRatio())
    this.group.add(Foreground.mesh)

    Clipboard.load(this.group, this.progress)
  }

  nextCase() {
    if (!this.gameEnded && this.progress < 5) {
      Skeleton.transitionOut(this.progress, this.controls)
      Clipboard.nextTexture(this.progress)
    }
  }

  onResize() {
    Foreground.onResize(this.renderer.getPixelRatio())
    this.renderTarget.setSize(window.innerWidth, window.innerHeight)
  }

  patientFile(cond: boolean) {
    this.patientFileOpened = cond


    if (cond) {
      store.state.radiologist.canvasClass('')
      this.controls.reset()
      this.controls.enabled = false
      gsap.to(Skeleton.skeletons[this.progress].position, {
        duration: 0.5,
        x: -5,
      })

      gsap.to(Clipboard.material.uniforms.uAlpha, {
        duration: 0.5,
        value: 1,
      })

      gsap.to(Clipboard.mesh.position, {
        duration: 0.5,
        x: 5,
      })
    } else {
      store.state.radiologist.canvasClass('game-active')
      gsap.to(Skeleton.skeletons[this.progress].position, {
        duration: 0.5,
        x: 0,
      })
      gsap.to(Clipboard.material.uniforms.uAlpha, {
        duration: 0.5,
        value: 0,
        onComplete: () => {
          this.controls.enabled = true
        },
      })

      gsap.to(Clipboard.mesh.position, {
        duration: 0.5,
        x: 10,
      })
    }
  }

  log() {
    console.log(
      this.camera.position.x,
      this.camera.position.y,
      this.camera.position.z
    )
  }

  gameState(state: string, cond: boolean) {
    switch (state) {
      case "timerCanStart":
        this.gameRunning = true
        this.controls.enabled = true
        break
      case "timerPause":
        this.controls.enabled = !cond
        this.gameRunning = !cond
        break
      default:
        break
    }
  }

  confirm = (res: boolean) => {
    if (res) {
      store.state.radiologist.addFolder()
      store.state.radiologist.removeFolder(this.progress)

      this.progress++
      store.commit("updateProgress", this.progress)



      if (this.selectedMesh === Skeleton.errorMesh) {
        Skeleton.errorMesh = null
        this.selectedMesh = null
        this.goodAnswers++
        // this.currentIntersect = null

        this.nextCase()

        console.log("RADIOLOGIST GAME : GOOD ANSWER")
      } else {
        console.log("RADIOLOGIST GAME: WRONG ANSWER")

        store.state.radiologist.penalty()
        this.nextCase()
      }

      if (this.progress === 5 && !this.gameEnded) {
        this.gameEnded = true
        store.commit("setConfirmPopup", false)

        this.endGame()
        return
      }
    }

    if (this.currentIntersect) {
      gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
        duration: 0.2,
        value: 1,
      })
    }
    this.currentIntersect = null
    this.gameRunning = true
    store.commit("setConfirmPopup", false)
  };

  onClick() {
    if (
      this.gameRunning &&
      !this.gameEnded &&
      this.currentIntersect &&
      !store.state.radiologist.confirm
    ) {
      //clicked on something, show popup

      store.commit("setConfirmPopup", true)
      store.commit("setConfirmCallback", this.confirm)
      this.gameRunning = false
      this.selectedMesh = this.currentIntersect.object
    }
  }

  useAI() {
    let mat = null

    if (Skeleton.errorMesh) {
      mat = Skeleton.errorMesh.material as THREE.ShaderMaterial
    }

    if (this.progress === 1) {
      mat = Skeleton.wrongAI2.material as THREE.ShaderMaterial
    }

    if (this.progress === 4) {
      mat = Skeleton.wrongAI5.material as THREE.ShaderMaterial
    }


    mat.uniforms.uFresnelColor.value = new THREE.Color("#FF0000")


    gsap.to(mat.uniforms.uFresnelWidth, {
      value: params.fresnelIntensity,
      duration: 1,
      yoyo: true,
      repeat: -1,
    })

    this.aiUsed++
    // this.controls.enableDamping = false
    this.controls.enabled = false
    this.controls.usedAI = true
    // this.controls.autoRotate = true

    raf.subscribe("lerpControls", this.lerpControls)
  }

  lerpControls = () => {
    this.controls.target.y +=
      (AI_CAMERA_VALUES[this.progress] - this.controls.target.y) * 0.025
    this.camera.position.y +=
      (AI_CAMERA_VALUES[this.progress] - this.camera.position.y) * 0.025

    this.controls.radius += (5 - this.controls.radius) * 0.025

    if (
      Math.abs(this.controls.target.y - AI_CAMERA_VALUES[this.progress]) < 0.01
    ) {
      raf.unsubscribe("lerpControls")
      this.controls.enabled = true
      this.controls.usedAI = false
    }
  };

  endGame() {
    this.gameEnded = true

    console.log("END OF THE GAME")

    const results = {
      AIused: this.aiUsed,
      processedFiles: this.progress,
      goodAnswers: this.goodAnswers,
    }

    store.commit("setResults", results)

    Skeleton.isAnimating = true
    gsap.to(Skeleton.currentSkeleton.position, {
      y: -20,
      duration: 0.5,
      onComplete: () => {
        store.commit("setGameEnded", true)
        Skeleton.isAnimating = false

        this.group.remove(Clipboard.mesh)
        this.skeletonScene.remove(Skeleton.currentSkeleton)
        raf.unsubscribe("radioUpdate")

        this.camera.position.z = 1

        this.controls.dispose()
      },
    })

    gsap.to(Skeleton.uniforms.uAlpha, {
      duration: 0.5,
      value: 0,
    })
  }

  updateRenderTarget() {
    this.renderer.setRenderTarget(this.renderTarget)
    this.renderer.render(this.skeletonScene, this.camera)
    this.renderer.setRenderTarget(null)
  }

  fromMeshToMesh() {
    // ÉTAIT SUR UN MESH AVANT, VIENT DE CHANGER DE MESH
    // DONC SI CHANGEMENT DE MESH, RESET LE VISUEL DE L'ANCIEN

    coef = 0
    gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
      duration: 0.25,
      value: 1,
    })
  }

  onMesh(delta: number, intersects: THREE.Intersection) {
    // EST SUR UN MESH
    this.currentIntersect = intersects
    if (coef < params.fresnelIntensity) {
      coef += delta * params.fresnelSpeed
      this.currentIntersect.object.material.uniforms.uFresnelWidth.value =
        1 - coef
    }

    store.state.radiologist.updateCursor(-5)

  }

  fromMeshToBlank() {
    //FROM MESH TO NOTHING

    gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
      duration: 0.25,
      value: 1,
    })

    store.state.radiologist.updateCursor(0)
  }

  update = () => {
    this.updateRenderTarget()
    const delta = this.clock.getDelta()



    if (Skeleton.loaded) {
      if (this.gameRunning) {
        if (!Skeleton.isAnimating && !this.patientFileOpened) {
          if (!this.isDragging && Skeleton.skeletons[this.progress]) {
            this.raycaster.setFromCamera(this.mouse, this.camera)
            const intersects = this.raycaster.intersectObjects(
              Skeleton.skeletons[this.progress].children,
              true
            )

            if (intersects.length) {
              if (
                this.currentIntersect &&
                this.currentIntersect.object !== intersects[0].object
              )

                this.fromMeshToMesh()
              this.onMesh(delta, intersects[0])
            } else {
              if (this.currentIntersect) this.fromMeshToBlank()
              this.currentIntersect = null
              coef = 0
              this.controls.update()
            }
          } else {
            if (this.currentIntersect) {
              //on drag, if current intersect is defined, make it unselect and put it to null
              this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1
              this.currentIntersect = null
            }
          }
        }
      }
    }
  };
}
