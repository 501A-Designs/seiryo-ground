import React from 'react'
import styles from '../styles/ThisMonthPlace.module.css'

export default function ThisMonthPlace(props) {

  let background = 'white';
  if (props.type === 'blue') {
    background = 'linear-gradient(90deg, #00FFD1 0%, #5FC3FB 100%)';
  }if(props.type === 'green'){
    background = 'linear-gradient(90deg, #C3F304 0%, #50F403 100%)'
  }if(props.type === 'red'){
    background = 'linear-gradient(90deg, #FFB422 0%, #FB7B5F 100%)'
  }if(props.type === 'purple'){
    background = 'linear-gradient(90deg, #BA49FF 0%, #6E56FF 100%)'
  }


  return (
    <div
      className={styles.thisMonthPlace}
      style={{
        background: "url('/open-nakameguro.jpg')",
        backgroundPosition: "center"
      }}
    >
      <div
        className={styles.gradientCover}
        onClick={props.onClick}
      >
        <h3 style={{margin:0}}>{props.prefecture}にある</h3>
        <h1 className={styles.title}>
          {props.name}
        </h1>
        <p>{props.description}</p>
      </div>
    </div>
  )
}
