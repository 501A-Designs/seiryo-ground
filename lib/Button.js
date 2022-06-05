import React from 'react'

export default function Button(props) {
    const button = {
        backgroundColor:'black',
        borderColor:'black',
        color:'white',
        cursor:'pointer',
        padding:'0.5em 1em',
        fontSize:'0.7em',
        cursor:'pointer',
    }
    return (
        <button
            style={button}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
