
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.10.4';

// for camera
const fov = 75;
const aspect_ratio = window.innerWidth / window.innerHeight;
const near_point = 0.1;
const far_point = 15000;
const x_position = 0;
const y_position = 30;
const z_position = 30;

// for renderer
let viewport_coverage = 0.85;
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
let models_path = "./models";
let object_to_show = "/gear-48t.gltf";

// as object
const xdir_rotation = Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? 1 : -1;
const ydir_rotation = Math.random() < 0.5 ? 1 : -1;
const ROT_SPEED_X = 0.0003 * xdir_rotation;
const ROT_SPEED_Y = 0.0015 * ydir_rotation;


const addEdgesToModel = (model) => {
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.metalness = 1.0;
            child.material.roughness = 0.5;
            child.material.envMapIntensity = 1.5;
            
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });
}

const center_obj_ = (obj_to_center) => {
    const box = new THREE.Box3().setFromObject(obj_to_center);
    const center = box.getCenter(new THREE.Vector3());
    obj_to_center.position.sub(center);
}

loader.load(
    `${models_path}${object_to_show}`,
    (GLTF) => {
        obj_ = GLTF.scene;

        center_obj_(obj_);
        addEdgesToModel(obj_);    
        scene.add(obj_);
            
        obj_.rotation.set(0, 0, .67);
        obj_.position.set(5, 5, 5);

        obj_.traverse((child) => {
            if (child.isMesh) {
                gsap.to(child.material, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        });

    },
    undefined,
    (err) => {
        console.log(err);
    }
)
// initialize renderer
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
viewport_coverage = isMobile ? 0.7 : 0.85;

const resizeRenderer = () => {
    const vw = window.visualViewport?.width || window.innerWidth;
    const vh = window.visualViewport?.height || window.innerHeight;

    const width  = vw * viewport_coverage;
    const height = vh * viewport_coverage;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
};

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

window.addEventListener('resize', resizeRenderer);


// to DOM
document.getElementById("modelbar").appendChild(renderer.domElement)

// camera position
camera.position.x = x_position;
camera.position.y = y_position;
camera.position.z = z_position;

// lighting
const top_light = new THREE.DirectionalLight(0x99a0ff, .5);
const bottom_light = new THREE.DirectionalLight(0x99a0ff, .5);
const ambient_light = new THREE.AmbientLight(0x555555, 5);

top_light.position.set(-750, 750, 750);
bottom_light.position.set(-750, -750, -750);

scene.add(top_light);
scene.add(bottom_light);
scene.add(ambient_light);
    
// controls
controls.enableDamping = !isMobile;
controls.dampingFactor = 0.1;

controls.minPolarAngle = -Infinity; 
controls.maxPolarAngle = Infinity;

controls.enableDamping = true;
controls.dampingFactor = 0.1;

controls.enableZoom = true;
controls.screenSpacePanning = true;

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

    if (obj_) {
        obj_.rotation.x += ROT_SPEED_X;
        obj_.rotation.y += ROT_SPEED_Y;
    }

    controls.update();
    renderer.render(scene, camera);
}

resizeRenderer();

anim_();
