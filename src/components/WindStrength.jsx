import React, {useState} from 'react'
import {Slider} from 'antd'
import '@style/WindStrength.scss'
export default function WindStrength({onChange}) {
    const [strength, setStrength] = useState(0)

    const foo = (v) => {
        setStrength(v)
        onChange(v)
    }
    return (
        <div className="wind-strength">
            <p className="slider-label">调整风力</p>
            <Slider min={0} max={5} step={0.1} onChange={foo}></Slider>
            <p className="current-strength">当前{strength}</p>
        </div>
    )
}