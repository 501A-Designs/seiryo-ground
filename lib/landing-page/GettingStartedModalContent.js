import { doc, setDoc } from 'firebase/firestore';
import React,{useState} from 'react'
import { db } from '../../firebase';
import AlignItems from '../AlignItems'
import SolidButton from '../SolidButton'
import { buttonSound } from '../sound/audio';
import StaticGrid from '../StaticGrid'

export default function GettingStartedModalContent(props) {
  const [modalSection, setModalSection] = useState(0);
  const createUserDoc = async() =>{
    await setDoc(doc(db, `users/${props.user.uid}/`), {
      likes:[]
    });
  }

  return (
    <>
      <AlignItems justifyContent={'center'}>
        <h2>
          {modalSection === 0 && '初めまして'}
          {modalSection === 1 && '他にも'}
        </h2>
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
            <SolidButton
              onClick={()=>{
                setModalSection(1);
                createUserDoc();
                buttonSound();
              }}
            >
              次へ
            </SolidButton>
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
            <SolidButton onClick={props.closeModal}>
              完了！
            </SolidButton>
          </>
        }
      </StaticGrid>
    </>
  )
}
