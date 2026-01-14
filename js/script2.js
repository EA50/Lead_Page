
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.10.4';

// for camera
const fov = 75;
const aspect_ratio = window.innerWidth / window.innerHeight;
const near_point = 0.1;
const far_point = 5500;
let x_position_cam = 40;
let y_position_cam = 40;
let z_position_cam = 40;
let x_position = 0;
let y_position = 0;
let z_position = 0;
let x_scale = 1;
let y_scale = 1;
let z_scale = 1;
let x_rot = 0;
let y_rot = 0;
let z_rot = 0;

// for renderer
let viewport_coverage = 0.85;

// for object & environment;
let obj_;

// for animation state
let ydir_rotation = Math.random() < 0.5 ? 1 : -1;
let isAnimationEnabled = true;
let rotationTween; 

const startRotation = (obj_touse) => {
    if (!obj_touse) return;
    if (rotationTween) rotationTween.kill();

    rotationTween = gsap.to(obj_touse.rotation, {
        y: Math.PI * 2 * ydir_rotation,
        duration: 120,
        repeat: -1,
        ease: "none",
        paused: !isAnimationEnabled
    });
};

// necessary
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( fov, aspect_ratio, near_point, far_point);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

// loading initial model
let models_path = "../models - Copy";
let object_to_show = "gear-48t.gltf";
var current_object = "";

const addEdgesToModel = (model) => {
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.metalness = 1.0;
            child.material.roughness = 0.5;
            child.material.envMapIntensity = 1.5;

            child.material.transparent = true;
            child.material.opacity = 1;
        }
    });
}


loader.load(
    `${models_path}/${object_to_show}`,

    
    (gltf) => {
        obj_ = gltf.scene;

        
        obj_.rotation.set(x_rot, y_rot, z_rot);
        addEdgesToModel(obj_);    
        scene.add(obj_);

        current_object = object_to_show;

        startRotation(obj_);
    },
    undefined,
    (err) => {
        console.log(err);
    }
)

// loading new model
const disposeModel = () => {
    if (obj_) {
        obj_.traverse((child) => {
            if (child.isMesh) {
                child.geometry.dispose();
                if (child.material.isMaterial) {
                    child.material.dispose();
                } else {
                    child.material.forEach(m => m.dispose());
                }
            }
        });
        scene.remove(obj_);
    }
};

let isLoading = false;

const loadNewModel = (object_path) => {
    
    if (isLoading) {
        alert("Already loading a model. Please wait.");
        return;
    }
    isLoading = true;

    disposeModel();

    
    console.log( "path", `${models_path}/${object_path}`);

    loader.load(
        `${models_path}/${object_path}`,
        (gltf) => {

            obj_ = gltf.scene;

            switch (object_path) {
                // Row 2
                case "tree climber.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 0.35; y_scale = 0.35; z_scale = 0.35;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "tumbler.glb":
                    x_position_cam = 40; y_position_cam = 50; z_position_cam = 40;
                    x_position = 0; y_position = -10; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "umbrella frame at frozen state.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 42.5; y_scale = 42.5; z_scale = 42.5;
                    x_rot = -3.14159 / 2; y_rot = 0; z_rot = 0;
                    break;

                // Custom Projects
                case "branch trimmer tool.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 0.8; y_scale = 0.8; z_scale = 0.8;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "conference table.glb":
                    x_position_cam = 40; y_position_cam = 15; z_position_cam = 150;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 0.8; y_scale = 0.8; z_scale = 0.8;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "stand table.glb":
                    x_position_cam = 40; y_position_cam = 100; z_position_cam = 140;
                    x_position = 0; y_position = -50; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                // More Models
                case "p1 - cone attachment.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p2 - connector.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p3 - slider component.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p4 - sheet metal holder.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p5 - slab comp.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p6 - hinge component.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 20; y_scale = 20; z_scale = 20;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p7 - angled holder component.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = .45; y_scale = .45; z_scale = .45;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p8 - static angle component.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p9 - tubes and shelves.glb":
                    x_position_cam = 0; y_position_cam = 150; z_position_cam = 150;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "P10-soap dish.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p11 - bearing connector.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p12 - another sheet metal holder.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p13 - oxygen tank.glb":
                    x_position_cam = 150; y_position_cam = 150; z_position_cam = 150;
                    x_position = 0; y_position = -30; z_position = 0;
                    x_scale = 5.5; y_scale = 5.5; z_scale = 5.5;
                    x_rot = -Math.PI / 2; y_rot = 0; z_rot = 0;
                    break;

                case "p14 - angle grinder.glb":
                    x_position_cam = 50; y_position_cam = 50; z_position_cam = 50;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 2; y_scale = 2; z_scale = 2;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "gear-48t.gltf":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = 0; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;

                case "p17 - another slider component.glb":
                    x_position_cam = 40; y_position_cam = 40; z_position_cam = 40;
                    x_position = 0; y_position = -20; z_position = 0;
                    x_scale = 1; y_scale = 1; z_scale = 1;
                    x_rot = 0; y_rot = 0; z_rot = 0;
                    break;
            }

            
            set_original_pos(x_position_cam, y_position_cam, z_position_cam);
            obj_.position.set(x_position, y_position, z_position);
            obj_.scale.set(x_scale, y_scale, z_scale);
            obj_.rotation.set(x_rot, y_rot, z_rot);
            obj_.updateMatrixWorld(true);

            addEdgesToModel(obj_);    
            scene.add(obj_);

            startRotation(obj_);

            camera.position.x = x_position_cam;
            camera.position.y = y_position_cam;
            camera.position.z = z_position_cam;


            isLoading = false;
        },
        undefined,
        (err) => {
            console.log(err, "path", `${models_path}/${object_path}`);
            isLoading = false;
        }
    )
};

document.querySelectorAll('.slriobj').forEach((item) => {
    item.addEventListener('click', () => {
        const modelTarget = item.dataset.modelslistitem;
        current_object = modelTarget;

        loadNewModel(modelTarget);
    });
});

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
camera.position.x = x_position_cam;
camera.position.y = y_position_cam;
camera.position.z = z_position_cam;

// lighting
const top_light = new THREE.DirectionalLight(0x99a0ff, .5);
const bottom_light = new THREE.DirectionalLight(0x99a0ff, .5);
const ambient_light = new THREE.AmbientLight(0x555555, 5);

top_light.position.set(250, -250, 250);
bottom_light.position.set(250, 250, -250);
ambient_light.position.set(500, 500, 500);

scene.add(top_light);
scene.add(bottom_light);
scene.add(ambient_light);
    
// controls
controls.minPolarAngle = -Infinity; 
controls.maxPolarAngle = Infinity;

controls.enableDamping = true;
controls.dampingFactor = 0.1;

controls.enableZoom = true;
controls.enablePan = true;
controls.screenSpacePanning = true;

// return animation
let originalPos = { 
    x: x_position_cam, 
    y: y_position_cam,
    z: z_position_cam
};

const set_original_pos = (valx, valy, valz) => {
    originalPos = { 
        x: valx, 
        y: valy,
        z: valz
    };
}

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
    }, 3500);
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

resizeRenderer();

anim_()

// exports
const set_animation = (val) => {
    isAnimationEnabled = val;

    if (!rotationTween) return;

    if (isAnimationEnabled) {
        rotationTween.play();
    } else {
        rotationTween.pause();
    }
}

const reset_pos = () => {
    returnToHome();
}

const set_current_object = (val) => {
    current_object = val;
}

export {
    set_animation,
    reset_pos,
    loadNewModel,
    set_current_object
};