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
                Created Using Vercel
                <br/>
                Designed & Produced by 501A
            </p>
        </footer>
    )
}
