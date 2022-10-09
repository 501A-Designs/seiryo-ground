import React from 'react'

export default function AlignItems(props) {
    const alignItems = {
        display:'flex',
        margin:`${props.margin}`,
        flexDirection: `${props.flexDirection ? props.flexDirection:'row'}`,
        height: `${props.height}`,
        alignItems:`${props.alignItems ? props.alignItems:'center'}`,
        gap:`${props.gap ? props.gap:'0.5em'}`,
        justifyContent:`${props.spaceBetween ? 'space-between':props.justifyContent}`
    }
    return (
        <div style={alignItems}>{props.children}</div>
    )
}
