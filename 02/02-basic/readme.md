# 基础入门篇下

## Scene.fog
```js
/**
 * .fog : Fog
    一个fog实例定义了影响场景中的每个物体的雾的类型。默认值为null。
    Fog( color : Integer, near : Float, far : Float )
    near: 开始应用雾的最小距离。距离小于活动摄像机“near”个单位的物体将不会被雾所影响。
    far: 结束计算、应用雾的最大距离，距离大于活动摄像机“far”个单位的物体将不会被雾所影响。
 */
scene.fog = new THREE.Fog(0x1A1A1A, 1, 1000);
```

## 控制器
```js
/**
 * Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
    要使用这一功能，就像在/examples（示例）目录中的所有文件一样， 您必须在HTML中包含这个文件。
 */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * OrbitControls( object : Camera, domElement : HTMLDOMElement )
    object: （必须）将要被控制的相机。该相机不允许是其他任何对象的子级，除非该对象是场景自身。
    domElement: 用于事件监听的HTML元素。
 */
const controls = new OrbitControls(camera, renderer.domElement);
/**
 * 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
 */
controls.enableDamping = true;
```

## 添加光源（不添加光都是黑色的）
```js
/**
 * AmbientLight	环境光，是一种基础光源，它的颜色会添加到整个场景和所有对象的当前颜色上
 * PointLight	点光源，空间中的一点，朝所有的方向发射光线
 * SpotLight	聚光灯光源，这种光源有聚光的效果，类似台灯、天花板上的吊灯，或者手电筒
 * DirectionLight	方向光，也称为无限光。从这种光源发出的光线可以看着平行的。例如，太阳光
 * HemishpereLight半球光，这是一种特殊光源，可以用来创建更加自然的室外光线，模拟放光面和光线微弱的天空  
 * AreaLight面光源，使用这种光源可以指定散发光线的平面，而不是空间中的一个点
 * LensFlare镜头眩光，不是源，但可以通过 LensFlare 为场景中的光源添加镜头光晕效果
 * 
 */

/**
 * 环境光会均匀的照亮场景中的所有物体。环境光不能用来投射阴影，因为它没有方向。
 * AmbientLight( color : Color, intensity : Float )
    color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。
    intensity -（可选）光照的强度。默认值为 1。
 */
const light = new THREE.AmbientLight(0xdeedff, 1.5);
scene.add(light);
```

## 球体类(SphereGeometry)
```js
/**
 * radius — 球体半径，默认为1。
    widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
    heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
    phiStart — 指定水平（经线）起始角度，默认值为0。。
    phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
    thetaStart — 指定垂直（纬线）起始角度，默认值为0。
    thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。
 */
SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
```

## 圆环缓冲几何体（TorusGeometry），基类BufferGeometry
```js
/**
 * radius - 环面的半径，从环面的中心到管道横截面的中心。默认值是1。
    tube — 管道的半径，默认值为0.4。
    radialSegments — 管道横截面的分段数，默认值为12。
    tubularSegments — 管道的分段数，默认值为48
    arc — 圆环的圆心角（单位是弧度），默认值为Math.PI * 2。
 */
TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
```

## MeshToonMaterial
一种实现卡通着色的材质。

## 二十面缓冲几何体（IcosahedronGeometry）
一个用于生成二十面体的类。
```js
/**
 * radius — 二十面体的半径，默认为1。
    detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个二十面体。当这个值大于1的时候，实际上它将变成一个球体。
 */
IcosahedronGeometry(radius : Float, detail : Integer)
```