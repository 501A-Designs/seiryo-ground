import React from 'react'

export default function TypeBadge(props) {
    let background;
    if (props.type === 'blue') {
        background = 'linear-gradient(90deg, #8DFCE8 0%, #5FC3FB 100%)';
    }if(props.type === 'green'){
        background = 'linear-gradient(90deg, #ECFC8D 0%, #91FB5F 100%)'
    }if(props.type === 'red'){
        background = 'linear-gradient(90deg, #FCD68D 0%, #FB7B5F 100%)'
    }if(props.type === 'purple'){
        background = 'linear-gradient(90deg, #D88DFC 0%, #755FFB 100%)'
    }

    const typeBadge = {
        // borderRadius: '5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic',
        width: '60px',
        height: '15px',
        background: background,
    }
    return (
        <div style={typeBadge}></div>
    )
}
