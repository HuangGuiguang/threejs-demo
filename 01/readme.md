# Three.js 基础入门上

## 导入
```cmd
npm install --save three
```

```js
import * as THREE from 'three';
```

## 大致步骤
1. 3D内容元素容器添加
2. 引入three.js
3. 初始化
    - 全局变量，如渲染尺寸、容器等
    - 初始化渲染器 Renderer
    - 初始化场景 Scene
    - 初始化相机 Camera
    - 处理页面缩放事件
4. 添加网格对象
5. 根据需求，更新渲染器、相机、网格对象、动画等

## 步骤实现
1. 页面结构
```html
<body>
  <canvas class="webgl"></canvas>
</body>
```

```css
html,
body {
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```

2. 初始化
    - 全局变量
    ```js
    // 定义渲染尺寸
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    ```

    - 初始化渲染器
    ```js
    const canvas = document.querySelector('canvas.webgl');
    // WebGLRender用WebGL渲染出你精心制作的场景。除此外还有诸多渲染器
    // canvas - 一个供渲染器绘制其输出的canvas 它和下面的domElement属性对应（可以在domElement属性里拿到）。 如果没有传这个参数，会创建一个新canvas
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    // 将输出canvas的大小调整为(width, height)并考虑设备像素比，且将视口从(0, 0)开始调整到适合大小 将updateStyle设置为false以阻止对canvas的样式做任何改变。
    renderer.setSize(sizes.width, sizes.height);
    // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ```

    - 初始化场景
    ```js
    // 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
    const scene = new THREE.Scene();
    ```

    - 初始化相机
    ```js
    /**
     * 这一摄像机使用perspective projection（透视投影）来进行投影。
     * PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
        fov — 摄像机视锥体垂直视野角度
        aspect — 摄像机视锥体长宽比
        near — 摄像机视锥体近端面
        far — 摄像机视锥体远端面
     */
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3
    scene.add(camera);
    ```

    - 页面缩放
    ```js
    // 页面缩放事件监听
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        // 更新渲染
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // 更新相机
        camera.aspect = sizes.width / sizes.height;
        // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
        camera.updateProjectionMatrix();
    });
    ```
