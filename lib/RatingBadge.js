import React from 'react'

export default function RatingBadge(props) {
    const ratingBadge = {
        borderRadius: '5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic',
        width: '20px',
        height: '20px',
        background: 'linear-gradient(90deg, #ECFC8D 0%, #BCFB75 52.6%, #91FB5F 100%)',
    }
    return (
        <div style={ratingBadge}></div>
    )
}
