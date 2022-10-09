import { styled } from '@stitches/react'
import React from 'react'
import { tapSound } from '../ux/audio'

export default function Button(props) {
    const Button = styled('button',{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:'0.5em',
        backgroundColor: `${props.fill ? 'white':'transparent'}`,
        border:`1px solid ${props.fill ? 'var(--sgMediumGray)':'transparent'}`,
        color:'gray',
        cursor:'pointer',
        padding:'0.5em 1em',
        width:'fit-content',
        fontSize:'0.8em',
        userSelect:'none',
        cursor:'pointer',
        transition:'0.3s',
        borderRadius:'50px',
        '&:hover':{
            transform: 'scale(1.05)',
            // backgroundColor:`${props.fill ? 'black':'var(--sgLightGray)'}`,
            // color: `${props.fill ? 'white':'black'}`,
            
            backgroundColor:'var(--sgLightGray)',
            color: 'black',
            border:`1px solid var(--sgMediumGray)`,
            // boxShadow:'0px 0px 15px white',
        }
    })
    return (
        <Button
            onMouseEnter={()=> tapSound()}
            onClick={props.onClick}
        >
            {props.iconPosition === 'left' && props.icon}
            {props.children}
            {props.iconPosition === 'right' && props.icon}
        </Button>
    )
}
