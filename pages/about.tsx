import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import Button from '../lib/button/Button'
import seiryoLogo from '../public/seiryoLogo.png'
import mountainGreen from '../public/concept/sg-mountain.png'
import AlignItems from '../lib/alignment/AlignItems';
import Margin from '../lib/alignment/Margin';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Grid from '../lib/alignment/Grid';
import Link from 'next/link';

export default function About() {
  const router = useRouter();
  return (
    <Margin>
      <Grid>
        <Image
          alt={'SG-logo'}
          src={mountainGreen}
          placeholder='blur'
          // fill
          layout={"responsive"}
        />
        <br/>
        <h3>初めまして。そして、</h3>
        <p>
          ご興味を持ってくださりありがとうございます。
        </p>
        <p>
          清涼広場、通称SEIRYO GROUNDは、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
          <br/>
          <br/>
          清涼広場にログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。また、SEIRYO Photographerとして応募すれば本サイトのレビューページにて写真が展示されます。是非、写真を撮るのが好きな方は応募してみてください。
          清涼広場は、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
          <br/>
          <br/>
          清涼広場にログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。また、SEIRYO Photographerとして応募すれば本サイトのレビューページにて写真が展示されます。是非、写真を撮るのが好きな方は応募してみてください。
          <br/>
          <br/>
          また、最後にSEIRYO GROUNDは私、<Link href="https://501a.netlify.app/">501A</Link>によって作り上げられたサイトです。
        </p>
        <AlignItems
          css={{
            marginBottom:20
          }}
        >
          <Button
            styleType={'transparent'}
            icon={<ArrowLeftIcon/>}
            onClick={()=> {
              router.push('/');
            }}
          >
            戻る
          </Button>
          <AlignItems
            gap={'0.5em'}
            css={{
              display:'flex',
              justifyContent:'flex-end'
            }}
          >
            <Image
              alt={'SG-logo'}
              src={seiryoLogo}
              width={15}
              height={15}
            />
            <h5>SEIRYO GROUND</h5>
          </AlignItems>
        </AlignItems>
      </Grid>
    </Margin>
  )
}
