import React from "react"

const TooltipClass = (props) => {
    const { title, time, origin, level } = props
    return (
        <div>
            <h3>{title}</h3>
            <p>{time}</p>
            <p>{origin}</p>
            <p>{level}</p>
        </div>
    )
}

export default TooltipClass