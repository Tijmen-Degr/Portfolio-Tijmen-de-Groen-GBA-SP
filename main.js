import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let objToRender = 'scene';

const loader = new GLTFLoader();

console.log(`Loading model from: gameboy_advance_sp/${objToRender}.gltf`);
loader.load(
    `gameboy_advance_sp/${objToRender}.gltf`,
    function (gltf) {
        console.log('Model loaded successfully');
        object = gltf.scene;
  
        scene .add(object);
        console.log('Model added to the scene:', object);
    },
    function (xhr) {
        console.log(`Loading progress: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
    },  
    function (error) {
        console.error('An error happened', error);
    }  
)


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls( camera, renderer.domElement );

document.getElementById('GBA-SP3D').appendChild(renderer.domElement); 

camera.position.set(0, 0.07, 0.2);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040, objToRender === 'GBA-SP' ? 5 : 1);
scene.add(ambientLight);

controls.update();
function animate () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera); 
    console.log(camera.position)
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
