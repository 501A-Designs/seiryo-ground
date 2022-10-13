import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems';
import Button from '../button/Button';
import { buttonSound } from '../ux/audio';
import { FiPlus, FiX } from "react-icons/fi";
import { scroll, scrollAnimation, scroller } from '../ux/scroll';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function CreatePlaceFormContainer(props) {
  const [createNew, setCreateNew] = useState(false);
  const [parent] = useAutoAnimate();
  
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
              buttonSound();
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
              buttonSound();
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
