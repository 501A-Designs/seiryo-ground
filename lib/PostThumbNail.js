import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import TypeBadge from './TypeBadge';
import styles from '../styles/PostThumbNail.module.css'

export default function PostThumbNail(props) {
    const router = useRouter();
    return (
        <div
            key={props.key}
            onClick={()=> router.push(`/place/${props.id}/`)}
            className={styles.postThumbNail}
        >
            <h3>{props.title}</h3>
            <TypeBadge type={props.type}/>
        </div>
    )
}
