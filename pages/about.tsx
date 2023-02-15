import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../lib/button/Button'
import sgCenteredLogo from '../public/sg-centered-logo.png'
import Container from '../lib/component/Container';
import AlignItems from '../lib/alignment/AlignItems';
import Margin from '../lib/alignment/Margin';
import { ArrowLeftIcon, ExternalLinkIcon } from '@radix-ui/react-icons';

export default function About() {
  const router = useRouter();
  return (
    <Margin>
        {/* <Image
          alt={'SG-logo'}
          src={sgCenteredLogo}
          width={180}
          height={180}
          style={{marginTop:'5em'}}
        /> */}
        <h1>SEIRYO GROUND</h1>
        <h2>SEIRYO GROUND</h2>
        <h3>SEIRYO GROUND</h3>

        <p>
          ご興味を持ってくださりありがとうございます。
        </p>
        <p>
          清涼広場は、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
          <br/>
          <br/>
          清涼広場にログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。また、SEIRYO Photographerとして応募すれば本サイトのレビューページにて写真が展示されます。是非、写真を撮るのが好きな方は応募してみてください。
        </p>
        <Button
          styleType={'transparent'}
          icon={<ArrowLeftIcon/>}
          onClick={()=> {
            router.push('/');
          }}
        >
          戻る
        </Button>
        <Button
          styleType={'transparent'}
          icon={<ExternalLinkIcon/>}
          onClick={()=> {
            router.push('https://501a.netlify.app/')
          }}
        >
          作者のウェブサイト
        </Button>
    </Margin>
  )
}
