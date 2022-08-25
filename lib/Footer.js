import React from 'react'

export default function Footer() {
    const footer = {
        display: 'flex',
        flex: 1,
        padding: '2rem 0',
        bottom:0,
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <footer>
            <p style={{textAlign: 'left'}}>
                Designed & Produced by 501A. Managed By Eminent, a Design Nerd Duo.
            </p>
        </footer>
    )
}
