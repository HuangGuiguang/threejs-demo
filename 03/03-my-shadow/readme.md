# 模型光源结合生成明暗变化的创意页面-光与影之诗
1. TWEEN 是用于生成页面补间动画的库，在本页面中使用它实现场景镜头切换和元素位移动画效果；
2. DRACOLoader 用于加载压缩过的模型，是提高页面加载速率和性能的关键；
3. GLTFLoader 用于加载 .gltf 或 .glb 格式的模型。

# LoadingManager
```js
// 初始化加载器
const manager = new THREE.LoadingManager();
// 此函数在加载开始时被调用
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
// 所有的项目加载完成后将调用此函数。默认情况下，该函数是未定义的，除非在构造函数中传入
manager.onLoad = function ( ) {
  console.log( 'Loading complete!');
};
// 此方法加载每一个项，加载完成时进行调用
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
// 此方法将在任意项加载错误时，进行调用
manager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};
const loader = new THREE.OBJLoader( manager );
// 加载模型
loader.load('file.obj', function (object) {});

```

## three使用右手坐标系
指向天的是y轴，右手方向是x轴，z方向是由屏幕射出来的方向

## 2π = 180°