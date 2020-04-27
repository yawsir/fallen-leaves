const leaf1Png = process.env.PUBLIC_URL + 'leaf_textures/leaf1.png'
const leaf2Png = process.env.PUBLIC_URL + 'leaf_textures/leaf2.png'
const leaf3Png = process.env.PUBLIC_URL + 'leaf_textures/leaf3.png'
const leaf4Png = process.env.PUBLIC_URL + 'leaf_textures/leaf4.png'
const defaultRange = 12000
const defaultCount = 120
const defaultSize = 500

export const leaf1option = {
    imageUrl: leaf1Png,
    range: defaultRange,
    size: defaultSize,
    count: defaultCount,
    opacity: 1
}
export const leaf1Props = {
    velocityY: 0,
    velocityX: 0,
    velocityZ: 0,
    rotation: Math.PI,
    mass: 0.3,               // 叶子质量
    currentHorizontalOffset: 0,    //当前水平偏移
    maxHorizontalOffset: 10,      //最大水平偏移
    swingVelocity: 0.1,           //叶子摇摆速度
    currentDeg: Math.PI,
    minDeg: Math.PI/2,
    maxDeg: 3*Math.PI/2,
    degVelocity: 0.01,
    falledMatName: 'falledLeaf1Mat',
    groupName: 'falledLeaf1Group'
}

export const leaf2option = {
    imageUrl: leaf2Png,
    range: defaultRange,
    size: defaultSize,
    count: defaultCount,
    opacity: 1,
}
export const leaf2Props = {
    velocityY: 0,
    velocityX: 0,
    velocityZ: 0,
    rotation: Math.PI/2,
    mass: 0.6,
    currentHorizontalOffset: 0,    //当前水平偏移
    maxHorizontalOffset: 14,      //最大水平偏移
    swingVelocity: 0.1,           //叶子摇速度
    currentDeg: Math.PI/2,
    minDeg: Math.PI/2,
    maxDeg: 3*Math.PI/2,
    degVelocity: 0.02,
    falledMatName: 'falledLeaf2Mat',
    groupName: 'falledLeaf2Group',
}

export const leaf3option = {
    imageUrl: leaf3Png,
    range: defaultRange,
    size: defaultSize,
    count: defaultCount,
    opacity: 1,
}
export const leaf3Props = {
    velocityY: 0,
    velocityX: 0,
    velocityZ: 0,
    rotation: Math.PI,
    mass: 0.9,
    currentHorizontalOffset: 0,    //当前水平偏移
    maxHorizontalOffset: 10,      //最大水平偏移
    swingVelocity: 0.2,           //叶子摇速度
    currentDeg: Math.PI,
    minDeg: Math.PI/2,
    maxDeg: 3*Math.PI/2,
    degVelocity: 0.015,
    falledMatName: 'falledLeaf3Mat',
    groupName: 'falledLeaf3Group',
}

export const leaf4option = {
    imageUrl: leaf4Png,
    range: defaultRange,
    size: defaultSize,
    count: defaultCount,
    opacity: 1,
}
export const leaf4Props = {
    velocityY: 0,
    velocityX: 0,
    velocityZ: 0,
    rotation: Math.PI,
    mass: 1.4,
    currentHorizontalOffset:11,    //当前水平偏移
    maxHorizontalOffset: 9,      //最大水平偏移
    swingVelocity: 0.18,           //叶子摇速度
    currentDeg: Math.PI,
    minDeg: Math.PI/2,
    maxDeg: 3*Math.PI/2,
    degVelocity: 0.013,
    falledMatName: 'falledLeaf4Mat',
    groupName: 'falledLeaf4Group',
}