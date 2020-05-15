import {createSprite} from './MyThreeUtil'

const mapGroup = {
    'falledLeaf1Group': (group, naturalProps) => {
        const {windDirection, windStrength, k} = naturalProps
        group.children.forEach( sprite => {
            sprite.velocityX += Math.sin(windDirection) * windStrength * k
            sprite.velocityZ += -Math.cos(windDirection) * windStrength * k
            sprite.position.x += sprite.velocityX
            sprite.position.z += sprite.velocityZ
        })
    },
    'falledLeaf2Group': (group, naturalProps) => {
        const {windDirection, windStrength, k} = naturalProps
        group.children.forEach( sprite => {
            sprite.velocityX += Math.sin(windDirection) * windStrength * k
            sprite.velocityZ += -Math.cos(windDirection) * windStrength * k
            sprite.position.x += sprite.velocityX
            sprite.position.z += sprite.velocityZ
        })
    }, 
    'falledLeaf3Group': (group, naturalProps) => {
        const {windDirection, windStrength, k} = naturalProps
        group.children.forEach( sprite => {
            sprite.velocityX += Math.sin(windDirection) * windStrength * k
            sprite.velocityZ += -Math.cos(windDirection) * windStrength * k
            sprite.position.x += sprite.velocityX
            sprite.position.z += sprite.velocityZ
        })
    }
}

/**
 * 叶子的自由落体
 * @param {any} particle 粒子
 * @param {number} range 粒子运动范围
 * @param {number} groundTopOffest 地面距离x-z平面的偏移量
 */
export const freeFall = (particle, range, groundTopOffest, leafMats, groups, naturalProps) => {
    const {k} = naturalProps
    // const {falledLeaf2Mat} = leafMats
    const mat = leafMats[particle.falledMatName]
    const grp = groups[particle.groupName]
    particle.velocityY += particle.mass * k // mass为叶子的重量 k为一个常量 
    particle.y -= particle.velocityY
    if (particle.y <= groundTopOffest+10) {
        particle.y = range
        particle.x += Math.random() * 20 - 10
        particle.z += Math.random() * 20 - 10
        particle.velocityY = 0
        const leaf = createSprite(mat, particle.x, -935, particle.z, 500)
        grp.add(leaf)
        if (grp.children.length > particle.maxFalled) {
            grp.children.shift()
        }
    }
}

const spining = (particle, map, naturalProps) => {
    const {minDeg, maxDeg} = particle
    particle.currentDeg += particle.degVelocity
    map.rotation = particle.currentDeg
    if (particle.currentDeg > maxDeg || particle.currentDeg < minDeg) {
        particle.degVelocity = - particle.degVelocity
    }
}

const swing = (particle) => {
    if(particle.currentHorizontalOffset <= -particle.maxHorizontalOffset || particle.currentHorizontalOffset >= particle.maxHorizontalOffset) {
        particle.swingVelocity = 0-(particle.swingVelocity)  //速度值取反
    }
    particle.currentHorizontalOffset += particle.swingVelocity
    particle.x += particle.currentHorizontalOffset
    particle.z += particle.currentHorizontalOffset
}


export const falledLeavesMove = (groups, range, naturalProps) => {
    const {windStrength} = naturalProps
    if (windStrength <= 0) {
        return
    }
    for (let groupName in groups) {
        if (groups.hasOwnProperty(groupName)) {
            mapGroup[groupName](groups[groupName], naturalProps)
        }
    }
}

/**
 * 
 * @param {any} particle 粒子
 * @param {number} range 粒子运动范围
 * @param {Object} naturalProps 自然环境属性
 */
export const particleTrajectoryWithWind = (particle, range, naturalProps) => {
    const {windDirection, windStrength, k} = naturalProps
    //三个方向的速度
    particle.velocityX += Math.sin(windDirection) * windStrength * k
    particle.velocityZ += -Math.cos(windDirection) * windStrength * k
    // 三个方向的坐标
    particle.x += particle.velocityX
    particle.z += particle.velocityZ
    if (particle.x > range){
        particle.x = -range
        particle.velocityX = 0
    }
    if (particle.x < -range) {
        particle.x = range
        particle.velocityX = 0
    }
    if (particle.z > range){
        particle.z = -range
        particle.velocityZ = 0
    }
    if (particle.z < -range) {
        particle.z = range
        particle.velocityZ = 0
    }
}

/**
 * 无风时的叶子运动 包括下落、运动、旋转
 * @param {any} particle 粒子
 * @param {Object} naturalProps 自然环境属性
 */
export const particleTrajectoryWithoutWind = (particle, map, naturalProps) => {
    // particle.velocityX = particle.velocityZ = 0
    /*
        如果速度大于0，速度值减小至0， 如果速度小于0，速度值增加至0，如果速度为0 什么也不做
    */
   const {a} = naturalProps
    
    if ( particle.velocityX > 0 ) {
        particle.velocityX -= a
        if (particle.velocityX <= 0) {
            particle.velocityX = 0
        }
    }
    if ( particle.velocityZ > 0 ) {
        particle.velocityZ -= a
        if (particle.velocityZ <= 0) {
            particle.velocityZ = 0
        }
    }
    if ( particle.velocityX < 0 ) {
        particle.velocityX += a
        if (particle.velocityX >= 0) {
            particle.velocityX = 0
        }
    }
    if ( particle.velocityZ < 0 ) {
        particle.velocityZ += a
        if (particle.velocityZ >= 0) {
            particle.velocityZ = 0
        }
    }
    //摇摆
    swing(particle)

    spining(particle, map, naturalProps)
}
