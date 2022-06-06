import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import Button from './Button'
import TypeBadge from './TypeBadge';

export default function PostThumbNail(props) {
    const router = useRouter();

    const postThumbNail = {
        // backgroundColor:'black',
        cursor:'pointer',
        width:'100%',
        height:'200px',
        borderTop:'2px solid black',
        borderLeft:'1px solid black',
        padding:'0.5em',
        display:'flex',
        justifyContent: 'center',
        flexDirection:'column',
        justifyContent: 'space-between',
    }
    return (
        <div style={postThumbNail} onClick={()=> router.push(`place/bruh`)}>
            {/* <img src={}/> */}
            <h1>{props.title}</h1>
            <AlignItems spaceBetween={true}>
                <time>{props.time}</time>
                <TypeBadge type={props.type}/>
            </AlignItems>
        </div>
    )
}
