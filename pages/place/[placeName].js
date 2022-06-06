import React from 'react'
import AlignItems from '../../lib/AlignItems'
import TypeBadge from '../../lib/TypeBadge'

export default function PlaceName() {
    let title = '小石川後楽園'
    let slug = 'koishikawakorakuen'

    return (
        <main>
            <section className="grid-1fr-2fr">
                <div>
                    <AlignItems spaceBetween={true}>
                        <h1>{title}</h1>
                        <AlignItems>
                            <TypeBadge type={'green'}/>
                            <time>07/20/2021</time>
                        </AlignItems>
                    </AlignItems>
                    <div>
                        <a href="https://www.tokyo-park.or.jp/park/format/index030.html">公式サイト</a>
                    </div>
                    <iframe
                        src={`https://www.google.com/maps?output=embed&q=${slug}`}
                        width="100%"
                        height="400px"
                        loading="lazy"
                    />
                </div>
                <div>
                    <p>小石川後楽園は日本の第三後楽園の一つです。</p>
                    <h3>写真</h3>
                    <p></p>
                    <h3>料金</h3>
                    <table>
                        <tr>
                            <td>大人・大学生</td>
                            <td>500円</td>
                        </tr>
                        <tr>
                            <td>子供</td>
                            <td>200円</td>
                        </tr>
                    </table>
                </div>
            </section>
        </main>
    )
}
