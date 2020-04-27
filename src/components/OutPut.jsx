import React, { useEffect, useRef } from 'react'
import {initCamera, initRenderer, initOrbitControls, initScene, createPoints, 
    initDirectionalLight} from '../utils/MyThreeUtil'
import {AxesHelper, PlaneBufferGeometry, TextureLoader, Mesh, Points, MeshStandardMaterial, CubeTextureLoader,
    RepeatWrapping,
    MeshLambertMaterial, SpriteMaterial, Group} from 'three'
import {leaf1option, leaf1Props, leaf2option, leaf2Props,leaf3option, leaf3Props,
        leaf4option, leaf4Props } from '../config/leaf'
import {particleTrajectoryWithWind, particleTrajectoryWithoutWind, freeFall} from '../utils/movement'
import Disc from './Disc'
import WindStrength from './WindStrength'
const pub = process.env.PUBLIC_URL
const groundJpg = pub + '/ground/Ground19/Ground19_Color.jpg'
const groundAoJpg = pub + '/ground/Ground19/Ground19_AO.jpg'
const skynx = pub + '/sky/forest2/nx.png'
const skyny = pub + '/sky/forest2/ny.png'
const skynz = pub + '/sky/forest2/nz.png'
const skypx = pub + '/sky/forest2/px.png'
const skypy = pub + '/sky/forest2/py.png'
const skypz = pub + '/sky/forest2/pz.png'
const windSound = pub + '/audios/Wind_grass_wispy_breeze.mp3'
const falledLeaf1Png = pub + '/leaf_textures/leaf1_falled.png'
const falledLeaf2Png = pub + '/leaf_textures/leaf2_falled.png'
const falledLeaf3Png = pub + '/leaf_textures/leaf3_falled.png'
const falledLeaf4Png = pub + '/leaf_textures/leaf4_falled.png'

export default function OutPut() {
    
    const naturalProps = {
        windDirection: Math.PI,       // 范围0~2PI 风向影响x轴 和z轴
        windStrength: 0,                   //风力
        k: 0.01,                              // 系数 控制最终数值
        a: 0.01   //当风向由其他值变为0 速度逐渐减慢的加速度

    }
    const groundTopOffest = -1000   //地面的y轴坐标
    const equipment = {
        // scene: null,
        // camera: null,
        // renderer: null
    }
    const groups = {}   
    const materials = {}
    const audioRef = useRef()


    // 重绘场景
    const rerender = () => {
        const {renderer, scene, camera} = equipment
        renderer.render(scene, camera)
    }


    const addAxesHelper = () => {
        const {scene} = equipment
        const axesHelper = new AxesHelper(200);
        scene.add(axesHelper)
        rerender()
    }
    const addGround = () => {
        const {scene} = equipment
        const groundGeo = new PlaneBufferGeometry(20000, 20000)
        const ground = new Mesh(groundGeo, materials.groundMat)
        ground.receiveShadow = true
        ground.rotation.x = -Math.PI / 2
        ground.position.y = groundTopOffest
        scene.add(ground)
        rerender()
    }

    // }

    // const addTrees = () => {
    //     const {scene} = equipment
    //     const gltfLoader = new GLTFLoader()
    //     gltfLoader.load(treeGLTF, (gltf) => {
    //         // console.log(gltf)
    //         const treeModel = gltf.scene
    //         // treeModel.position.set(0, -500, 0)
    //         treeModel.translateX(-500)
    //         treeModel.translateY(-1075)
    //         treeModel.scale.set(60, 60, 60)
    //         //setShadow(treeModel)
    //         treeModel.receiveShadow = true
    //         treeModel.castShadow = true
    //         scene.add(treeModel)
    //     })
    //     rerender()
    // }

    /**
     * 加载所有材质
     */
    const createMaterials = () => {
        const loader = new TextureLoader()
        //落叶材质
        const falledLeaf1Map = loader.load(falledLeaf1Png)
        const falledLeaf1Mat = new SpriteMaterial( {
            map: falledLeaf1Map,
            transparent: true,
        })
        const falledLeaf2Map = loader.load(falledLeaf2Png)
        const falledLeaf2Mat = new SpriteMaterial( {
            map: falledLeaf2Map,
            transparent: true,
        })
        const falledLeaf3Map = loader.load(falledLeaf3Png)
        const falledLeaf3Mat = new SpriteMaterial( {
            map: falledLeaf3Map,
            transparent: true,
        })
        const falledLeaf4Map = loader.load(falledLeaf4Png)
        const falledLeaf4Mat = new SpriteMaterial( {
            map: falledLeaf4Map,
            transparent: true,
        })
        
        
        //地面材质
        const groundTex = loader.load(groundJpg)
        // const groundNor = texLoader.load(groundNorJpg)
        const groundAo = loader.load(groundAoJpg)
        // const groundDis = texLoader.load(groundDisJpg)
        // const groundRgh = texLoader.load(groundRghJpg)
        groundTex.wrapT = RepeatWrapping
        groundTex.wrapS = RepeatWrapping
        groundTex.repeat.set(10, 10)
        const groundMat = new MeshLambertMaterial({
            map: groundTex,
            // normalMap: groundNor,
            aoMap: groundAo,
            // displacementMap: groundDis,
            // roughnessMap: groundRgh,
            // roughness: 1,
            skinning: true,
            flatShading: true,
            color: 0xE5B262
        })

        Object.assign(materials, {falledLeaf1Mat, falledLeaf2Mat, falledLeaf3Mat, falledLeaf4Mat, groundMat})
    }

    /**
     * 粒子(树叶)运动轨迹
     * @param {any} particle 粒子
     * @param {number} range 落叶范围
     * @param {number} groundTopOffest 地面偏移量
     * @param {Object} map 叶子的贴图
     */
    const particleTrajectory = (particle, range, groundTopOffest, map) => {
        const {windStrength} = naturalProps
        const {falledLeaf1Mat, falledLeaf2Mat, falledLeaf3Mat, falledLeaf4Mat} = materials
        freeFall(particle, range, groundTopOffest, {falledLeaf1Mat, falledLeaf2Mat, falledLeaf3Mat, falledLeaf4Mat}, groups, naturalProps)
        if (windStrength === 0) {
            // particle.velocityX = particle.velocityZ = 0
            particleTrajectoryWithoutWind(particle, map, naturalProps)
        } else {
            particleTrajectoryWithWind(particle, range, naturalProps)
        }
    }

    // 场景动画
    const animate = () => {
        const {scene} = equipment
        
        scene.children.forEach(item => {
            if (item instanceof Points) {
                const vertices = item.geometry.vertices
                const map = item.material.map
                vertices.forEach(particle => {
                    particleTrajectory(particle, 5500, groundTopOffest, map)
                })
                item.geometry.verticesNeedUpdate = true;
            }
        })
        requestAnimationFrame(animate)
        rerender()
    }

    //添加多种叶子
    const addLeaves = () => {
        const {scene} = equipment
        const leaf1Points = createPoints('leaf1', leaf1option, leaf1Props)
        const leaf2Points = createPoints('leaf2', leaf2option, leaf2Props)
        const leaf3Points = createPoints('leaf3', leaf3option, leaf3Props)
        // const leaf4Points = createPoints('leaf4', leaf4option, leaf4Props)
        const falledLeaf1Group = new Group()
        const falledLeaf2Group = new Group()
        const falledLeaf3Group = new Group()
        const falledLeaf4Group = new Group()

        window.group2 = falledLeaf2Group
        // pointsArr.push(leaf1Points)
        // pointsArr.push(leaf2Points)
        // pointsArr.push(leaf3Points)
        // pointsArr.push(leaf4Points)
        scene.add(leaf1Points, leaf2Points, leaf3Points)
        scene.add(falledLeaf1Group, falledLeaf2Group, falledLeaf3Group, falledLeaf4Group)
        Object.assign(groups, {falledLeaf1Group, falledLeaf2Group, falledLeaf3Group, falledLeaf4Group})
        // console.log(scene.children)
        // console.log(groups)
        animate()
    }

    const init = () => {
        const webglOutput = document.getElementById('webgl-output')

        const scene = initScene() 
        // scene.fog = new Fog( 0xF5F5F5, 100, 10000 );  //雾化
        const camera = initCamera(webglOutput)
        const renderer = initRenderer(webglOutput, 0xCBF4FC)
        initDirectionalLight(scene)
        camera.position.set(1500, 150, -1500)
        // camera.lookAt(0, 2100, 0)
        webglOutput.appendChild(renderer.domElement)
        // audioRef.current.volume = 0 // 风声初始为0
        const controler = initOrbitControls(camera, renderer, () => {
            rerender()
        })
        controler.maxPolarAngle = Math.PI / 2.1;
        controler.minDistance = 500
        controler.maxDistance = 5000
        equipment.scene = scene
        equipment.camera = camera
        equipment.renderer = renderer

        renderer.render(scene, camera)
    }

    const addSky = () => {
        const {scene} = equipment
        const loader = new CubeTextureLoader()
        // 分离的场景图
        const urls = [
            skypx, skynx,
            skypy, skyny,
            skypz, skynz
        ]
        loader.load(urls, tex => {
            scene.background = tex
        })
    } 

    

    useEffect(() => {
        createMaterials()
        init()
        addSky()
        addAxesHelper()
        addGround()
        // addTrees()
        addLeaves()
        return ()=>{}
    }, [])

    const changeWindDirection = (degValue) => {
        // rotation += Math.PI / 4 //改变叶子的方向 这个不好做
        naturalProps.windDirection = degValue* Math.PI / 180    //角度转弧度
        // console.log(naturalProps.windDirection)
    }

    const changeWindStrength = (strength) => {
        naturalProps.windStrength = strength
        audioRef.current.volume = strength * 0.2
        audioRef.current.muted = false
    }

    return (
        <>
            <div className="left">
                <Disc onTurn={changeWindDirection} discLabel='风的吹向' sliderLabel='调整风向'></Disc>
                <WindStrength onChange={changeWindStrength}></WindStrength>
            </div>
            <div id="webgl-output"></div>
            <audio ref={audioRef} src={windSound} loop={true} autoPlay={true} muted></audio>
        </>
    )
}