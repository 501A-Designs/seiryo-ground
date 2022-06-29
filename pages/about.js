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
        <div className="pageCenter">
            <div style={{display:'flex',justifyContent: 'center',flexDirection: 'column',alignItems: 'center',marginTop: '5%'}}>
                <Image src={sgCenteredLogo} width={300} height={230}/>
                <div style={{marginBottom:'1.5em'}}>
                    <p style={{textAlign: 'center', maxWidth:'500px'}}>ご興味を持ってくださりありがとうございます</p>
                    <p style={{textAlign: 'left', maxWidth:'500px'}}>
                        清涼広場は私が今まで行った場所で、清涼感や平和を味わえた所を全て一つにまとめたブログ的なサイトです。個人的には普段外に行くことは少ないのですが、行くとなると自然や文化と一体化できる場所が好きです。
                        <br/>
                        今はネットの普及などによって、情報交換が豊富となり、全て勢い良く同時進行している事を肌で感じられます。しかし、これによって、人間も生物であることを忘れてしまっている部分があると感じています。
                        <br/>
                        {/* 自然と文化の重要性を忘れず
                        我々の肉体がこの速さに追いつけていない気もします。 */}
                        限界を忘れず生き物として文化と自然の美しさと触れ合う機会を大事にしていきたいと思います。
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
                        onClick={()=> router.push('/')}
                    >
                        作者のウェブサイト
                    </Button>
                </AlignItems>
            </div>
        </div>
    )
}
