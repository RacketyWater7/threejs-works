import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader";
// import { FBXLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/FBXLoader";
// import { GLTFExporter } from "https://unpkg.com/three@0.126.1/examples/jsm/exporters/GLTFExporter";
// import { DecalGeometry } from "https://unpkg.com/three@0.126.1/examples/jsm/geometries/DecalGeometry";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

const loader = new GLTFLoader();
// const loader = new FBXLoader();
loader.load(
  "assets/superman3D.glb",
  function (glb) {
    console.log("glb: ", glb);
    // change the color of the Body
    glb.scene.traverse(function (child) {
      if (child.isMesh && child.type === "Mesh" && child.name === "Object_3") {
        child.material.color.set(0x008000);

        // child.material.map = texture;
        // child.material.needsUpdate = true;
      }
    });
    const root = glb.scene;
    root.scale.set(0.1, 0.1, 0.1);
    scene.add(root);
    // saving the edited model in file
    // const exporter = new GLTFExporter();
    // exporter.parse(scene, function (result) {
    //   console.log("result: ", result);
    //   const blob = new Blob([JSON.stringify(result)], {
    //     type: "application/json",
    //   });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.download = "panda.glb";
    //   a.href = url;
    //   a.textContent = "Download";
    //   document.body.appendChild(a);
    //   a.click();
    // });
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error occurred:", error);
  }
);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// });

// const boxMesh = new THREE.Mesh(geometry, material);
// scene.add(boxMesh);
// plane
let plane = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshBasicMaterial({ color: 0xcccccc })
);
plane.overdraw = true;
scene.add(plane);
//Boiler Plat Code
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0.12, 0.32);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.outputEncoding = true;
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// child.type === "SkinnedMesh" &&
// child.name === "Mesh"
