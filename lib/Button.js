import React from 'react'
import styles from '../styles/Button.module.css'

export default function Button(props) {
    return (
        <button
            className={styles.button}
            onClick={props.onClick}
        >
            {props.iconPosition === 'left' && props.icon}
            {props.children}
            {props.iconPosition === 'right' && props.icon}
        </button>
    )
}
