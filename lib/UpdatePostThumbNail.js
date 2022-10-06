import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from '../lib/alignment/AlignItems';
import styles from '../styles/UpdatePostThumbNail.module.css'
import { buttonSound, tapSound } from './ux/audio';

export default function PostThumbNail(props) {
    const router = useRouter();
    return (
        <div
            onMouseEnter={()=> tapSound()}
            key={props.key}
            onClick={()=> {
                buttonSound();
                router.push(`/news/${props.slug}`)
            }}
            className={styles.updatePostThumbNail}
        >
            <h2>{props.title}</h2>
            <AlignItems spaceBetween={true}>
                <time>作成日：{props.date}</time>
            </AlignItems>
        </div>
    )
}
