    // applyTexture(progress: number) {
    //     const texture = this.textureLoader.load(this.currentSkeleton.BAKE)

    //     texture.flipY = false
    //     this.uniforms.uMap.value = texture

    //     this.mesh.traverse(obj => {
    //         if (obj.type === "Mesh") {
    //             const mesh = obj as THREE.Mesh
    //             mesh.material = this.getShader()

    //             // const uvAttr = mesh.geometry.getAttribute("uv")
    //             // const fakeColor = new Float32Array(uvAttr.count * 3)

    //             // for (let i = 0; i < uvAttr.count; i++) {
    //             //     fakeColor[i * 3 + 0] = uvAttr.array[i * uvAttr.itemSize + 0]
    //             //     fakeColor[i * 3 + 1] = uvAttr.array[i * uvAttr.itemSize + 1]
    //             //     fakeColor[i * 3 + 2] = 0
    //             // }
    //             // mesh.geometry.setAttribute("color", new THREE.BufferAttribute(fakeColor, 3))

    //             // const sampler = new MeshSurfaceSampler(mesh).build()
    //             // const geo = new THREE.BufferGeometry()

    //             // const pos = new Float32Array(amount * 3)
    //             // const normal = new Float32Array(amount * 3)
    //             // const color = new Float32Array(amount * 3)

    //             // const positionTarget = new THREE.Vector3()
    //             // const normalTarget = new THREE.Vector3()
    //             // const colorTarget = new THREE.Color()

    //             // for (let i = 0; i < amount; i++) {
    //             //     sampler.sample(positionTarget, normalTarget, colorTarget)

    //             //     pos[i * 3 + 0] = positionTarget.x
    //             //     pos[i * 3 + 1] = positionTarget.y
    //             //     pos[i * 3 + 2] = positionTarget.z

    //             //     color[i * 3 + 0] = colorTarget.r
    //             //     color[i * 3 + 1] = colorTarget.g
    //             //     color[i * 3 + 2] = colorTarget.b

    //             //     normal[i * 3 + 0] = normalTarget.x
    //             //     normal[i * 3 + 1] = normalTarget.y
    //             //     normal[i * 3 + 2] = normalTarget.z
    //             // }

    //             // // console.log(color)
    //             // geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
    //             // geo.setAttribute("color", new THREE.BufferAttribute(color, 3))
    //             // geo.setAttribute("normal", new THREE.BufferAttribute(normal, 3))

    //             // const particle = new THREE.Points(geo, this.getShader())

    //             // skeletonScene.add(particle)

    //             if (mesh.name === this.errorsNames[progress]) {
    //                 this.errorMesh = mesh
    //             }

    //             if (mesh.name === "<3") {
    //                 this.heart = mesh
    //                 this.heartBaseScale = mesh.scale.x

    //                 raf.subscribe("heartbeat", this.heartbeat)
    //             }
    //         }

    //         // if (obj.type === 'Mesh') {
    //         //     const mesh = obj as THREE.Mesh
    //         //     mesh.material = this.getShader()

    //         //     const point = new THREE.Points(mesh.geometry, mesh.material)
    //         //     skeletonScene.add(point)
    //         // }
    //     })
    //     this.skeletonScene.add(this.mesh)
    // }