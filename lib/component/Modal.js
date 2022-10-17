import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { FiX } from 'react-icons/fi';
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import Button from '../button/Button';

const ModalBackdropStyled = styled('div',{
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex:20,
  cursor:'pointer',
  background: 'linear-gradient(to bottom,rgba(255,255,255,0) 0%,white 100%)',
  backdropFilter:'blur(5px)',
})
const ModalStyled = styled('div',{
  margin: '5% auto',
  padding: '2em',
  minWidth: '400px',
  maxWidth: '800px',
  height:'fit-content',
  maxHeight: '500px',
  overflowY:'scroll',
  backgroundColor:'white',
  color: 'black',
  borderRadius: '$r4',
  border:'1px solid $sgGray2',
  boxShadow: '0px 0px 15px $sgGray3',
  zIndex:2,
})

export default function Modal(props) {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {props.modalState &&
        <ModalBackdropStyled>
          <AlignItems
            justifyContent={'center'}
            margin={'2%'}
          >
            <Button
              color="white"
              onClick={props.onClickBackdrop}
              icon={<FiX/>}
              iconPosition={'left'}
            >
              閉じる
            </Button>
          </AlignItems>
          <ModalStyled>
            {props.children}
          </ModalStyled>
        </ModalBackdropStyled>
      }
    </div>
  )
}
