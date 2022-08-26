import { useRouter } from 'next/router'
import React from 'react'
import AlignItems from './AlignItems';
import TypeBadge from './TypeBadge';
import styles from '../styles/PostThumbNail.module.css'
import { VscCheck, VscHeart } from 'react-icons/vsc';

import {buttonSound,tapSound} from '../lib/sound/audio'

export default function PostThumbNail(props) {
    const router = useRouter();

    function Status({color}) {
      return (
        <div
            style={{
                backgroundColor: `${color}`,
                borderRadius: '10px',
                height: '7px',
                width:'7px'
            }}
        />
      )
    }
    

    return (
        <div
            onMouseEnter={()=>tapSound()}
            key={props.key}
            onClick={()=> {
                buttonSound();
                router.push(`/place/${props.id}/`);
            }}
            className={styles.postThumbNail}
        >

            <AlignItems>
                <h3 style={{marginTop: '0.5em'}}>{props.title}</h3>
                <AlignItems>
                    {/* {props.new && <Status color='red'/>} */}
                    {props.like && <VscHeart/>}
                </AlignItems>
            </AlignItems>
            <TypeBadge type={props.type} short/>
        </div>
    )
}
