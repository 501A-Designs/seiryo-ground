import React from 'react'

export default function Footer(props) {
    const footer = {
        paddingBottom:'1em'
    }
    return (
        <footer style={footer}>
            {props.children}
        </footer>
    )
}
