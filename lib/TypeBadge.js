import React from 'react'

export default function TypeBadge(props) {
    let background;
    if (props.type === 'blue') {
        background = 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)';
        // background = '#5FC3FB'
    }if(props.type === 'green'){
        background = 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)'
        // background = '#4AE800'
    }if(props.type === 'red'){
        background = 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)'
        // background = '#FB7B5F'
    }if(props.type === 'purple'){
        background = 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)'
        // background = '#6E56FF'
    }

    const typeBadge = {
        // borderRadius: '5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic',
        width: `${props.short ? '30px':'70px'}`,
        height: '5px',
        borderRadius:'10px',
        background: background,
    }
    return (
        <div style={typeBadge}></div>
    )
}
