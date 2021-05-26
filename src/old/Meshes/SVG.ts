// import { DoubleSide, Group, Mesh, MeshBasicMaterial, ShapeGeometry } from 'three'
// import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// import LoadManager from '~/three/Singletons/LoadManager'

// class SVG {
// 	loader: any
// 	group: Group

// 	constructor() {
// 		this.group = new Group()
// 		this.loader = new SVGLoader(LoadManager.manager)
// 	}

// 	load(url: any | string) {
// 		const onLoad = (data: any) => {
// 			console.log(data)
// 			const paths = data.paths;

// 			for (let i = 0; i < paths.length; i++) {

// 				const path = paths[i];

// 				const material = new MeshBasicMaterial({
// 					color: path.color,
// 					side: DoubleSide,
// 					depthWrite: false
// 				});

// 				const shapes = this.loader.createShapes(path);

// 				for (let j = 0; j < shapes.length; j++) {

// 					const shape = shapes[j];
// 					const geometry = new ShapeGeometry(shape);
// 					const mesh = new Mesh(geometry, material);
// 					this.group.add(mesh);

// 				}
// 			}
// 		}

// 		this.loader.load(url, onLoad, () => null, (error: any) => console.log(error))
// 	}
// }


// export default SVG