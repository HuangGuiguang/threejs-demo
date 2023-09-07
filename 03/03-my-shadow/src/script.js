import './style.css';
import { Clock, Scene, LoadingManager, WebGLRenderer, sRGBEncoding, Group, PerspectiveCamera, DirectionalLight, PointLight, MeshPhongMaterial, AmbientLight } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 定义渲染尺寸
const section = document.getElementsByClassName('section')[0];
let oldMaterial;
let width = section.clientWidth;
let height = section.clientHeight;

const renderer = new WebGLRenderer({
  canvas: document.querySelector('#canvas-container'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.autoClear = true;
renderer.outputEncoding = sRGBEncoding;

// 初始化场景
const scene = new Scene();

// 初始化相机
const cameraGroup = new Group();
scene.add(cameraGroup);
const camera = new PerspectiveCamera(35, width / height, 1, 1000)
camera.position.set(19, 1.54, -.1);
cameraGroup.add(camera);

// 页面缩放事件监听
window.addEventListener('resize', () => {
  let section = document.getElementsByClassName('section')[0];
  camera.aspect = section.clientWidth / section.clientHeight
  camera.updateProjectionMatrix();
  renderer.setSize(section.clientWidth, section.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 直射光
const directionLight = new DirectionalLight(0xffffff, .8);
directionLight.position.set(-100, 0, -100);
scene.add(directionLight);

// 点光源
const fillLight = new PointLight(0x88ffee, 2.7, 4, 3);
fillLight.position.set(30, 3, 1.8);
scene.add(fillLight);

/******************************************* 模型加载处理 ********************************************/
const ftsLoader = document.querySelector('.lds-roller'); // loading圈圈
const loadingCover = document.getElementById('loading-text-intro'); // loading文字
const loadingManager = new LoadingManager();
loadingManager.onLoad = () => {
  document.querySelector('.content').style.visibility = 'visible';
  const yPosition = { y: 0 };
  // 隐藏加载页面动画
  new TWEEN.Tween(yPosition)
    .to({ y: 100 }, 900)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onUpdate(() => { loadingCover.style.setProperty('transform', `translate(0, ${yPosition.y}%)`) }) // 移动自己的100% 等于不见了
    .onComplete(function () {
      loadingCover.parentNode.removeChild(loadingCover);
      TWEEN.remove(this);
    });
  // 使用Tween给相机添加入场动画
  new TWEEN.Tween(
    camera.position.set(0, 4, 2))
    .to({ x: 0, y: 2.4, z: 5.8 }, 3500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this);
      document.querySelector('.header').classList.add('ended');
      document.querySelector('.description').classList.add('ended');
    });

    // 自旋转
    new TWEEN.Tween(mesh.rotation)
        .to({ z: Math.PI * 2 }, 2000) // 设置旋转的目标值和持续时间
        .easing(TWEEN.Easing.Linear.None) // 设置缓动函数
        .repeat(Infinity) // 设置重复次数
        .start(); // 开始动画循环
  ftsLoader.parentNode.removeChild(ftsLoader);
  window.scroll(0, 0)
}

// 使用 dracoLoader 加载用blender压缩过的模型
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });

const loader = new GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);


var mesh
// 模型加载
loader.load('/models/statue.glb', function (gltf) {
  gltf.scene.traverse((obj) => {
    if (obj.isMesh) {
      oldMaterial = obj.material;
      obj.material = new MeshPhongMaterial({ shininess: 100 });
      mesh = obj
    }
  });
  scene.add(gltf.scene);
  // 下面两个是？
  oldMaterial.dispose();
  renderer.renderLists.dispose();
});

/****************************************************************************************************/

// 鼠标移动时添加虚拟光标
const cursor = { x: 0, y: 0 };
document.addEventListener('mousemove', event => {
  event.preventDefault();
  cursor.x = event.clientX / window.innerWidth - .5;
  cursor.y = event.clientY / window.innerHeight - .5;
  document.querySelector('.cursor').style.cssText = `left: ${event.clientX}px; top: ${event.clientY}px;`;
}, false);




// 页面重绘动画
const clock = new Clock()
let previousTime = 0;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  const parallaxY = cursor.y;
  const parallaxX = cursor.x
  fillLight.position.y -= (parallaxY * 9 + fillLight.position.y - 2) * deltaTime;
  fillLight.position.x += (parallaxX * 8 - fillLight.position.x) * 2 * deltaTime;
  cameraGroup.position.z -= (parallaxY / 3 + cameraGroup.position.z) * 2 * deltaTime;
  cameraGroup.position.x += (parallaxX / 3 - cameraGroup.position.x) * 2 * deltaTime;

//   mesh && (mesh.rotation.z += Math.random() * .02 * Math.PI);
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// 相机动画
function animateCamera(position, rotation) {
  new TWEEN.Tween(camera2.position)
    .to(position, 1800)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this)
    })
  new TWEEN.Tween(camera2.rotation)
    .to(rotation, 1800)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(function () {
      TWEEN.remove(this);
    });
}

// 页面Tab点击事件监听
document.getElementById('one').addEventListener('click', () => {
  document.getElementById('one').classList.add('active');
  document.getElementById('three').classList.remove('active');
  document.getElementById('two').classList.remove('active');
  document.getElementById('content').innerHTML = '昨夜西风凋碧树。独上高楼，望尽天涯路。';
  animateCamera({ x: 3.2, y: 2.8, z: 3.2 }, { y: 1 });
});

document.getElementById('two').addEventListener('click', () => {
  document.getElementById('two').classList.add('active');
  document.getElementById('one').classList.remove('active');
  document.getElementById('three').classList.remove('active');
  document.getElementById('content').innerHTML = '衣带渐宽终不悔，为伊消得人憔悴。';
  animateCamera({ x: -1.4, y: 2.8, z: 4.4 }, { y: -0.1 });
});

document.getElementById('three').addEventListener('click', () => {
  document.getElementById('three').classList.add('active');
  document.getElementById('one').classList.remove('active');
  document.getElementById('two').classList.remove('active');
  document.getElementById('content').innerHTML = '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。';
  animateCamera({ x: -4.8, y: 2.9, z: 3.2 }, { y: -0.75 });
});