import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import Button from './Button'
import TypeBadge from './TypeBadge';
import styles from '../styles/UpdatePostThumbNail.module.css'

export default function PostThumbNail(props) {
    const router = useRouter();
    return (
        <div
            key={props.key}
            onClick={()=> router.push(`/news/${props.slug}`)}
            className={styles.updatePostThumbNail}
        >
            <h2>{props.title}</h2>
            <AlignItems spaceBetween={true}>
                <time>作成日：{props.date}</time>
            </AlignItems>
        </div>
    )
}
