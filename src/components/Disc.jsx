import React, {useState} from 'react'
import '@style/Dics.scss'
import Slider from 'antd/es/slider'
export default function Disc({onTurn, discLabel, sliderLabel}) {
    
    const [deg, setDeg] = useState(0)
    const changeDeg = (newDeg) => {
        setDeg(newDeg)
        onTurn(newDeg)
    }

    const marks = {
        0: '北',
        90: '东',
        180: '南',
        270: '西',
        360: '北'
    }

    return (
        <div className="disc">
            <div className="outer">
                <p className='disc-label'>{discLabel}</p>
                <div className="inner" >
                    <div className="circle" style={{transform: `rotate(${deg}deg)`}}>
                        <div className="pointer"></div>
                        <div className="arrow arrow_left"></div>
                        <div className="arrow arrow_right"></div>
                    </div>
                </div>
                <p id='north' className="direction">北</p>
                <p id='south' className="direction">南</p>
                <p id='west' className="direction">西</p>
                <p id='east' className="direction">东</p>
            </div>
            <p className="slider-label">{sliderLabel}</p>
            <Slider type="primary" min={0} max={360} onChange={changeDeg} marks={marks} tooltipVisible={false}></Slider>

        </div>
    )
}