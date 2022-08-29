import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import { VscChevronLeft,VscChevronRight, VscLinkExternal } from 'react-icons/vsc';
import AlignItems from '../lib/AlignItems';
import Button from '../lib/Button'
import sgCenteredLogo from '../public/sg-centered-logo.png'

export default function About() {
    const router = useRouter();

    return (
        <div className="pagePadding">
            <div style={{display:'flex',justifyContent: 'center',flexDirection: 'column',alignItems: 'center',marginTop: '5%'}}>
                <Image src={sgCenteredLogo} width={200} height={160}/>
                <div style={{marginBottom:'1.5em'}}>
                    <p style={{textAlign: 'center', maxWidth:'500px'}}>ご興味を持ってくださりありがとうございます。</p>
                    <p style={{textAlign: 'left', maxWidth:'500px'}}>
                        清涼広場は、清涼感を味える場所・自然や文化と一体化できる場所等をご紹介するサイトです。場所はそれぞれ「緑」「青」「赤」「紫」という4つのカテゴリーに振り分けられており、誰もがログインして投稿できる形となっています。
                        <br/>
                        <br/>
                        清涼広場にログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。また、SEIRYO Photographerとして応募すれば
                        <br/>
                        <br/>
                        また、清涼広場は現在Eminentデザイングループより管理されており、501Aにより開発・プロデュースされているサイトであります。ログインしたユーザー様は具体的に、新しい場所の投稿そして既に投稿されている場所それぞれにレビューを一つ残すことが出来ます。現段階では日本にある場所のみの投稿をお願いしております。
                        <br/>
                        <br/>
                        Managed By Eminent, a Design Nerd Duo.
                        <br/>
                        Designed & Produced by 501A.
                    </p>
                </div>
                <AlignItems>
                    <Button
                        iconPosition={'left'}
                        icon={<VscChevronLeft/>}
                        onClick={()=> router.push('/')}
                    >
                        戻る
                    </Button>
                    <Button
                        iconPosition={'right'}
                        icon={<VscLinkExternal/>}
                        onClick={()=> router.push('https://501a.netlify.app/')}
                    >
                        作者のウェブサイト
                    </Button>
                </AlignItems>
            </div>
        </div>
    )
}
