import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems';
import Button from '../Button';
import { buttonSound } from '../ux/audio';
import { FiPlus, FiX } from "react-icons/fi";
import { scrollAnimation, scroller } from '../ux/scroll';

export default function CreatePlaceFormContainer(props) {
  const [createNew, setCreateNew] = useState(false);
  return (
    <>
      <AlignItems justifyContent={'center'}>
        {
          createNew ?
          <Button
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
      <div name={'createPlaceForm'}>
        {createNew && <>{props.children}</>}
      </div>
    </>
  )
}
