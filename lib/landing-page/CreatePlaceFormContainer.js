import React, {useState} from 'react'
import AlignItems from '../alignment/AlignItems';
import Button from '../button/Button';
import {FiPlus, FiX} from "react-icons/fi";
import {scrollAnimation, scroller} from '../ux/scroll';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import useSound from 'use-sound';

export default function CreatePlaceFormContainer(props) {
  const [createNew, setCreateNew] = useState(false);
  const [parent] = useAutoAnimate();
  const [tap1] = useSound('/sound/tap-1-sg.mp3');
  const [action1] = useSound('/sound/action-1-sg.mp3');
  
  return (
    <>
      <AlignItems justifyContent={'center'}>
        {
          createNew ?
          <Button
            color='black'
            iconPosition={'left'}
            icon={<FiX/>}
            onClick={()=>{
              tap1();
              setCreateNew(false);
            }}
          >
            閉じる
          </Button>:
          <Button
            color='black'
            iconPosition={'left'}
            icon={<FiPlus/>}
            onClick={()=>{
              action1();
              setCreateNew(true);
              scroller.scrollTo('createPlaceForm',scrollAnimation)
            }}
          >
            場所を追加
          </Button>
        }
      </AlignItems>
      <div
        name={'createPlaceForm'}
        ref={parent}
        style={{
          padding: '1em',
        }}
      >
        {createNew && <>{props.children}</>}
      </div>
    </>
  )
}
