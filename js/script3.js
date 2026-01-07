console.log("testing");

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.10.4';

// for camera
const fov = 75;
const aspect_ratio = window.innerWidth / window.innerHeight;
const near_point = 0.1;
const far_point = 5500;
const x_position = 0;
const y_position = 20;
const z_position = 40;

// for renderer
const viewport_coverage = 0.85;

// for object & environment;
let obj_;

// necessary
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, aspect_ratio, near_point, far_point);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

// model path
let models_path = "../models";
let object_to_show = "/gears/gears.gltf";

// as object
const ydir_rotation = Math.random() < 0.5 ? 1 : -1;

const addEdgesToModel = (model) => {
    const edgeMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
    model.traverse((child) => {
        if (child.isMesh) {
            const edges = new THREE.EdgesGeometry(child.geometry, 30);
            
            const line = new THREE.LineSegments(edges, edgeMaterial);
            
            child.updateMatrixWorld(true);
            line.applyMatrix4(child.matrixWorld);

            child.add(line);

            child.material.metalness = 1.0;
            child.material.roughness = 0.5;
            child.material.envMapIntensity = 1.5;
        }
    });
}

loader.load(
    `${models_path}${object_to_show}`,
    (gltf) => {
        obj_ = gltf.scene;

        console.log('object within loader', obj_);

        addEdgesToModel(obj_);    
        scene.add(obj_);

        gsap.to(obj_.rotation, {
            y: 3.14159 * 2 * ydir_rotation,
            duration: 120,
            repeat: -1,
            ease: "none"
        });
    },
    undefined,
    (err) => {
        console.log(err);
    }
)

// initialize renderer
renderer.setSize( viewport_coverage * window.innerWidth, viewport_coverage * window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// to DOM
document.getElementById("modelbar").appendChild(renderer.domElement)

// camera position
camera.position.x = x_position;
camera.position.y = y_position;
camera.position.z = z_position;

// lighting
const top_light = new THREE.DirectionalLight(0xffffff, .5);
const bottom_light = new THREE.DirectionalLight(0xffffff, .5);
const ambient_light = new THREE.AmbientLight(0x555555, 5);

top_light.position.set(750, 750, 750);
bottom_light.position.set(-750, -750, -750);

scene.add(top_light);
scene.add(bottom_light);
scene.add(ambient_light);
    
// controls

const originalPos = { 
    x: x_position, 
    y: y_position, 
    z: z_position 
};
const originalTar = new THREE.Vector3(0, 0, 0);

let resetTimer;
let isAutopilot = false;

controls.addEventListener('change', () => {
    if (isAutopilot) return;

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
        returnToHome();
    }, 1750);
});

const returnToHome = () => {
    isAutopilot = true;

    const tl = gsap.timeline({
        onComplete: () => { 
            isAutopilot = false; 
        }
    });

    tl.to(camera.position, {
        x: originalPos.x,
        y: originalPos.y,
        z: originalPos.z,
        duration: 2,
        ease: "expo.inOut"
    }, 0);

    tl.to(controls.target, {
        x: originalTar.x,
        y: originalTar.y,
        z: originalTar.z,
        duration: 2,
        ease: "expo.inOut",
        onUpdate: () => controls.update()
    }, 0);
};

// rendering
const anim_ = () => {
    requestAnimationFrame(anim_)
    
    controls.update();
    renderer.render(scene, camera);
}

anim_()
