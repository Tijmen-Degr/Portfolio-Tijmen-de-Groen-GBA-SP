import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load('gameboy_advance_sp/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
}, undefined, (error) => {
    console.error(error);
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple box to represent the Game Boy Advance SP (replace with your model)
const geometry = new THREE.BoxGeometry(1, 0.5, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const gameBoy = new THREE.Mesh(geometry, material);
scene.add(gameBoy);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    gameBoy.rotation.x += 0.01;
    gameBoy.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();