import {Scene, PerspectiveCamera, WebGLRenderer, Color, PCFSoftShadowMap,
SpotLight, AmbientLight, PointLight, Geometry, Points,
PointsMaterial, Vector3, TextureLoader, AdditiveBlending, DoubleSide, DirectionalLight, Vector2,
Sprite} from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 * 初始化相机
 * @param {domElement} outputDom 输出的dom元素 
 */
export function initCamera(outputDom) {
    const {clientWidth:width, clientHeight:height} = outputDom
    const k = width / height; //窗口宽高比
    // const s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    const camera = new PerspectiveCamera(45, k, 0.1, 10000);
    camera.position.set(20, 40, 10)
    camera.lookAt(20, 30, 0)
    return camera
}

/**
 * 初始化渲染器
 * @param {domElement} outputDom 输出的dom元素
 * @param {number} clearColor 十六进制颜色
 */
export function initRenderer(outputDom, clearColor){
    const {clientWidth:width, clientHeight:height} = outputDom
    const renderer = new WebGLRenderer()
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.setClearColor(new Color(clearColor))
    return renderer
}

/**
 * 初始化场景
 */
export function initScene() {
    const scene = new Scene()
    return scene
}

/**
 * 初始化鼠标控制器
 * @param {Camera} camera 相机
 * @param {WebglRenderer} renderer 渲染器
 * @param {Function} callback 相机位置改变后的回调函数
 */
export const initOrbitControls = (camera, renderer, callback) => {
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.addEventListener('change', callback.bind(this))
    return orbit
}

/**
 * 初始化聚光灯光源 
 * @param {Scene} scene 场景对象
 */
export const initSpotLight = (scene) => {
    const spotLight = new SpotLight(0xffffff)
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.camera.fov = 15;
    spotLight.castShadow = true;
    spotLight.decay = 2;
    spotLight.penumbra = 0.05;
    spotLight.position.set(100, 200, 300)
    const ambientLight = new AmbientLight(0x343434)
    scene.add(spotLight)
    scene.add(ambientLight)
    // const debugCamera = new CameraHelper(spotLight.shadow.camera)
    // scene.add(debugCamera)
    // const lightHelper = new SpotLightHelper(spotLight)
    // scene.add(lightHelper)
    return spotLight
}

/**
 * 初始化点光源 
 * @param {Scene} scene 场景对象
 */
export const initPointLight = (scene) => {
    const pointLight = new PointLight(0xffffff, 1, 2000, 2)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 10000;
    pointLight.shadow.mapSize.height = 10000;
    // pointLight.shadow.camera.fov = 60;
    // pointLight.decay = 2;
    // pointLight.penumbra = 0.05;
    pointLight.position.set(800, 800, 800)
    const ambientLight = new AmbientLight(0x343434)
    scene.add(pointLight)
    scene.add(ambientLight)
    // const debufCamera = new CameraHelper(pointLight.shadow.camera)
    // scene.add(debufCamera)
    return pointLight
}


export const initDirectionalLight = (scene) => {
    const direcLight = new DirectionalLight(0xffffff, 1)
    direcLight.castShadow = true
    scene.add(direcLight)
    return direcLight
}


/**
 * 
 * @param {string} name 粒子系统对象名称
 * @param {Object} options 粒子系统配置参数
 * @param {Object} particleProps 粒子的属性
 */
export const createPoints = (name, options, particleProps = {}) => {
    const {imageUrl, range, size, count, opacity} = options
    const texLoader = new TextureLoader()
    const geo = new Geometry()
    const tex = texLoader.load(imageUrl)
    tex.center = new Vector2(0.5, 0.5)
    tex.rotation = particleProps.rotation || 0
    const mat = new PointsMaterial({
        map: tex,
        transparent: true,
        size,
        // needsUpdate: true,
        sizeAttenuation: true,
        opacity,
        blending: AdditiveBlending,
        side: DoubleSide,
        alphaTest: 0.1          // 这样可以使透明背景不渲染
    })
    for (let i = 0; i < count; i++) {
        let x = Math.random() * range - range / 2   // -range/2 ~ range/2
        let y = Math.random() * range / 2            // 0~range/2
        let z = Math.random() * range - range / 2
        const particle = new Vector3(x, y, z)
        for (let key in particleProps) {
            particle[key] = particleProps[key]
        }
        geo.vertices.push(particle)
    }
    const points = new Points(geo, mat)
    points.name = name
    points.castShadow = true
    return points
}

export const createSprite = (mat, x, y, z, scale) => {
    const sprite = new Sprite(mat)
    sprite.position.set(x, y, z)
    sprite.scale.set(scale, scale, scale)
    return sprite
}

