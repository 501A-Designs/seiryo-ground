import { useAutoAnimate } from '@formkit/auto-animate/react'
import { styled } from '@stitches/react'
import React from 'react'
import { FiX } from 'react-icons/fi';
import AlignItems from '../alignment/AlignItems';
import Button from '../button/Button';

export default function Modal(props) {
  const [parent] = useAutoAnimate();
  const ModalBackdrop = styled('div',{
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
  const Modal = styled('div',{
    margin: '5% auto',
    padding: '2em',
    minWidth: '400px',
    maxWidth: '800px',
    height:'fit-content',
    overflowY:'scroll',
    borderRadius: '20px',
    backgroundColor:'white',
    color: 'black',
    border:'1px solid var(--sgGray)',
    zIndex:2,
    boxShadow: '0px 0px 15px var(--sgLightGray)',
  })

  return (
    <div ref={parent}>
      {props.modalState &&
        <ModalBackdrop>
          <AlignItems
            justifyContent={'center'}
            margin={'5% 5px 5px 5px'}
          >
            <Button
              fill
              onClick={props.onClickBackdrop}
              icon={<FiX/>}
              iconPosition={'left'}
            >
              閉じる
            </Button>
          </AlignItems>
          <Modal>
            {props.children}
          </Modal>
        </ModalBackdrop>
      }
    </div>
  )
}
