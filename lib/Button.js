import React from 'react'
import styles from '../styles/Button.module.css'

export default function Button(props) {
    return (
        <button
            className={styles.button}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
