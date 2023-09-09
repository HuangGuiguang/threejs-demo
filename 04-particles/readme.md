# dat.GUI
它是可以通过在页面上添加一个可视化控制器来修改代码参数的库，方便动态查看和调试页面在各种参数下的渲染效果

# 通过Sprite添加粒子
```js
let material = new THREE.SpriteMaterial({
    color: Math.random() * 0xffffff,
});
/**
 * 精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
 * Sprite( material : Material )
    material - （可选值）是SpriteMaterial的一个实例。 默认值是一个白色的SpriteMaterial。
*/
let sprite = new THREE.Sprite(material);
sprite.position.set(x * 4, y * 4, 0);
// 通过scale设置x、y、z上的比例
sprite.scale.set(3, 3, 3)
scene.add(sprite);
```

# 通过Points添加粒子
```js
const geom = new THREE.BufferGeometry();

const material = new THREE.PointsMaterial({
    size: 4,
    // 是否使用顶点着色
    vertexColors: true,
    color: 0xffffff,
});

let veticsFloat32Array = []
let veticsColors = []
for (let x = -15; x < 15; x++) {
    for (let y = -10; y < 10; y++) {
        veticsFloat32Array.push(x * 4, y * 4, 0);
        const randomColor = new THREE.Color(Math.random() * 0xffffff);
        veticsColors.push(randomColor.r, randomColor.g, randomColor.b);
    }
}

/**
 * BufferAttribute( array : TypedArray, itemSize : Integer, normalized : Boolean )
 * itemSize -- 队列中与顶点相关的数据值的大小。举例，如果 attribute 存储的是三元组（例如顶点空间坐标、法向量或颜色值）则itemSize的值应该是3。
 */
const vertices = new THREE.Float32BufferAttribute(veticsFloat32Array, 3);
const colors = new THREE.Float32BufferAttribute(veticsColors, 3);
geom.attributes.position = vertices;
geom.attributes.color = colors;

/**
 * Points( geometry : BufferGeometry, material : Material )
    geometry —— （可选）是一个BufferGeometry的实例，默认值是一个新的BufferGeometry。
    material —— （可选） 是一个对象，默认值是一个PointsMaterial。不一定要用PointsMaterial
*/
const points = new THREE.Points(geom, material);
scene.add(points);
```

# 使用canvas或贴图纹理样式化粒子
```js
// 本质上就是给材质material贴图
const material = new THREE.PointsMaterial({
    size: size,
    transparent: transparent,
    opacity: opacity,
    'map': createCanvasTexture(),
    // map: texture,
    sizeAttenuation: sizeAttenuation,
    color: color,
    // 是否在渲染此材质时启用深度测试。默认为 true。
    // depthTest: true,
    // 渲染此材质是否对深度缓冲区有任何影响。默认为true。
    // 在绘制2D叠加时，将多个事物分层在一起而不创建z-index时，禁用深度写入会很有用。
    depthWrite: false
})

// canvas贴图
const createCanvasTexture = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 300
    ctx.lineWidth = 10;
    ctx.beginPath();
    // createLinearGradient()方法创建一个沿参数坐标指定的直线的渐变。
    // createLinearGradient()方法需要指定四个参数，分别表示渐变线段的开始和结束点。
    var grd = ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop('0', 'black');
    grd.addColorStop('0.3', 'magenta');
    grd.addColorStop('0.5', 'blue');
    grd.addColorStop('0.6', 'green');
    grd.addColorStop('0.8', 'yellow');
    grd.addColorStop(1, 'red');
    ctx.strokeStyle = grd;
    /**
     * arc() 是 Canvas 2D API 绘制圆弧路径的方法。
     * 圆弧路径的圆心在 (x, y) 位置，半径为 r，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
     */
    ctx.arc(120, 120, 50, 0, Math.PI * 2);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
}

// 图片贴图
const texture = new THREE.TextureLoader().load('/images/heart.png');
```

# 使用几何体为基础创建粒子(主要靠分段数来创建粒子排布)
```js
// 创建立方体
// const sphereGeometry = new THREE.BoxGeometry(15, 15, 15, 10, 10, 10);
// 分段数决定了粒子的数量
const sphereGeometry = new THREE.SphereGeometry(15, 32, 16);
// 创建粒子材质
const material = new THREE.PointsMaterial({
    'color': 0xffffff,
    'size': 3,
    'blending': THREE.AdditiveBlending,
    'map': generateSprite(),
    'depthWrite': false
})
// 创建粒子
const particles = new THREE.Points(sphereGeometry, material)
scene.add(particles)
```
