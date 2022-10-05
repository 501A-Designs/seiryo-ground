import { styled } from '@stitches/react'
import React from 'react'
import { tapSound } from './sound/audio'

export default function Button(props) {
    const Button = styled('button',{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap:'0.5em',
        backgroundColor: 'transparent',
        color:'gray',
        border:'0px solid transparent',
        cursor:'pointer',
        padding:'0.5em 1em',
        width:'fit-content',
        fontSize:'0.8em',
        cursor:'pointer',
        transition:'0.3s',
        '&:hover':{
            transform: 'scale(1.05)',
            borderRadius:'50px',
            backgroundColor:'var(--sgLightGray)',
            color: 'black'
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
