import React,{useState} from 'react'
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import AlignItems from '../alignment/AlignItems'
import StaticGrid from '../alignment/StaticGrid'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { styled } from '@stitches/react';
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
  backgroundColor:'black',
  border:'1px solid black',
  color: 'white',
  borderRadius: '$r4',
  margin: '5% auto',
  padding: 'extraLarge',
  minWidth: '400px',
  maxWidth: '500px',
  height:'fit-content',
  overflowY:'scroll',
  zIndex:2,
  boxShadow: '$shadow1',
  userSelect: 'none',
})

export default function GettingStartedModal(props) {
  const [parent] = useAutoAnimate();

  const [modalSection, setModalSection] = useState(0);
  const createUserDoc = async() =>{
    await setDoc(doc(db, `users/${props.user.uid}/`), {
      likes:[],
      userName: props.user.displayName,
      level:1
    });
  }

  return (
    <div ref={parent}>
      {props.modalState &&
        <ModalBackdropStyled>
          <ModalStyled>
            <AlignItems justifyContent={'center'}>
              <h3>
                {modalSection === 0 && '初めまして'}
                {modalSection === 1 && '他にも'}
              </h3>
            </AlignItems>
            <StaticGrid
              grid={'1fr'}
              gap={'1em'}
              animate
            >
            {modalSection === 0 &&
              <>
                <p>
                  <strong>SEIRYO GROUNDへようこそ。</strong>
                  <br/>
                  本サイトにログインしてくださりありがとうございます。
                  <br/>
                  <br/>
                  清涼広場は、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
                </p>
                <AlignItems justifyContent={'center'}>
                  <Button
                    fill
                    onClick={()=>{
                      setModalSection(1);
                      createUserDoc();
                    }}
                  >
                    次へ
                  </Button>
                </AlignItems>
              </>
            }
            {modalSection === 1 &&
              <>
                <p>SEIRYO GROUNDに関連するリンクの一覧です。興味があればご覧ください。</p>
                <ul>
                  <li><a>清涼広場について</a></li>
                  <li><a>Eminentについて</a></li>
                  <li><a>清涼ニュース</a></li>
                  <li><a>SEIRYO Photographer</a></li>
                </ul>
                <p>※外をクリックすると消えます。</p>
                <AlignItems justifyContent={'center'}>
                  <Button
                    fill
                    onClick={props.closeModal}
                  >
                    完了！
                  </Button>
                </AlignItems>
              </>
            }
            </StaticGrid>
          </ModalStyled>
        </ModalBackdropStyled>
      }
    </div>
  )
}

