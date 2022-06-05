import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import Button from './Button'
import RatingBadge from './RatingBadge';

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
        <div style={postThumbNail}>
            {/* <img src={}/> */}
            <h1>{props.name}</h1>
            <AlignItems spaceBetween={true}>
                <Button onClick={()=> router.push('/about')}>詳細</Button>
                <RatingBadge rating={'5.0'}/>
            </AlignItems>
        </div>
    )
}
