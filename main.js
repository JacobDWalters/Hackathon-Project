import { orbitControls } from "./orbit-controls";
//build scene and camera, set camera FOV, Size, and distances
//move the camera along the Z axis
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.setZ(30);


//build the renderer and assign what to render on
//set render picture quality and size
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background')
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


//create a light to see objects if they are not just basic material
//move light so its not at the same spot as the object
//light is an object so it needs to be added to the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25,25,25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//create gridlines that you can see to build things on
//helpers can be used to see the axises and light position
const gridHelper = new THREE.GridHelper(200, 50);
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(gridHelper, lightHelper);


//orbit controls to navigate the 3D space with mouse
const controls = new orbitControls(camera, renderer.domElement);

//create Objects with geometry(shape), material(visuals), 
// Mesh(combining the 2 so that it can be added)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


//instead of calling render many times use a reccursive function
//inside of animation loop you can give objects properties
// such as rotation, animation, and scale
const animate = () => {
    requestAnimationFrame(animate);
    //rotation 
    torus.rotation.x += 0.01;
    torus.rotation.y +=0.01;
    torus.rotation.z +=0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();