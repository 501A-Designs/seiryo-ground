import React from 'react'

export default function AlignItems(props) {
    const alignItems = {
        display:'flex',
        alignItems:'center',
        gap:'0.5em',
        justifyContent:`${props.spaceBetween && 'space-between'}`
    }
    return (
        <div style={alignItems}>{props.children}</div>
    )
}
