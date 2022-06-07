import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import Button from './Button'
import TypeBadge from './TypeBadge';
import styles from '../styles/PostThumbNail.module.css'

export default function PostThumbNail(props) {
    const router = useRouter();
    return (
        <div
            key={props.key}
            onClick={()=> router.push(`place/${props.slug}`)}
            className={styles.postThumbNail}
        >
            {/* <img src={}/> */}
            <h1>{props.title}</h1>
            <AlignItems spaceBetween={true}>
                <time>{props.date}</time>
                <TypeBadge type={props.type}/>
            </AlignItems>
        </div>
    )
}
