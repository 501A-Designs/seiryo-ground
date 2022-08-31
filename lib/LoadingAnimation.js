import React from 'react'
import styles from '../styles/LoadingAnimation.module.css'

export default function LoadingAnimation(props) {
  return (
    <div
      ref={props.ref}
      className={props.noAnimation ? styles.container:styles.loadingContainer}
    >
      <h3 styles={styles.title}>{props.title ? props.title:'更新中'}</h3>
      {props.children}
    </div>
  )
}
