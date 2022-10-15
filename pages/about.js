import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import AlignItems from '../lib/alignment/AlignItems';
import Button from '../lib/button/Button'
import MainBody from '../lib/component/MainBody';
import sgCenteredLogo from '../public/sg-centered-logo.png'

export default function About() {
  const router = useRouter();
  return (
    <MainBody>
      <AlignItems
        justifyContent={'center'}
        flexDirection={'column'}
        margin={'2em 0 0 0'}
      >
        <Image src={sgCenteredLogo} width={200} height={200}/>
        <div style={{marginBottom:'1.5em'}}>
          <p style={{textAlign: 'center', maxWidth:'500px'}}>ご興味を持ってくださりありがとうございます。</p>
          <p style={{textAlign: 'left', maxWidth:'500px'}}>
            清涼広場は、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
            <br/>
            <br/>
            清涼広場にログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。また、SEIRYO Photographerとして応募すれば本サイトのレビューページにて写真が展示されます。是非、写真を撮るのが好きな方は応募してみてください。
            <br/>
            <br/>
            Designed & Produced by 501A.
          </p>
        </div>
        <AlignItems>
          <Button
            color="transparent"
            iconPosition={'left'}
            icon={<FiArrowLeft/>}
            onClick={()=> {
              router.push('/');
            }}
          >
            戻る
          </Button>
          <Button
            color="transparent"
            iconPosition={'right'}
            icon={<FiExternalLink/>}
            onClick={()=> {
              router.push('https://501a.netlify.app/')
            }}
          >
            作者のウェブサイト
          </Button>
        </AlignItems>
      </AlignItems>
    </MainBody>
  )
}
