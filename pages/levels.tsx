import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import AlignItems from '../lib/alignment/AlignItems'
import Button from '../lib/button/Button'
import Footer from '../lib/component/Footer'
import MainBody from '../lib/component/MainBody'
import End from '../lib/End'

export default function Levels() {
  const router = useRouter();
  return (
    <MainBody>
      <AlignItems
       margin={'0.5em 0 0 0'}
      >
        <Button
          color="white"
          iconPosition="left"
          icon={<FiArrowLeft/>}
          onClick={() =>router.push('/')}
        >
          戻る
        </Button>
      </AlignItems>

      <h1>SEIRYO CARD</h1>
      <h3>カードのレベルについて</h3>
      <p>
        本サイト、「SEIRYO GROUND | 清涼広場」にログインしたユーザー様はみんなデフォルトでSEIRYO GROUND メンバーシップカードをもらいます。ログインしているユーザー様は<Link href="/profile">こちら</Link>からアクセスできます。カードにはそれぞれ5段階のレベルがあり清涼広場に貢献する頻度と量によってカードのレベルが上がります。
      </p>
      <h3>マイルストーン</h3>
      <p>カードがアップグレードされるときのマイルストーン：</p>
      <ul>
        <li>Level 1（白カード）：清涼広場にログインした全てのユーザー様</li>
        <li>Level 2（青カード）：清涼広場に新しい場所を2ヶ所追加し、レビューを2件追加したユーザー様</li>
        <li>Level 3（緑カード）：清涼広場に新しい場所を5ヶ所追加し、レビューを5件追加したユーザー様</li>
        <li>Level 4（黄カード）：清涼広場に新しい場所を10ヶ所追加し、レビューを10件追加したユーザー様</li>
        <li>Level 5（黒カード）：清涼広場に新しい場所を20ヶ所以上追加し、レビューを20件追加したユーザー様</li>
      </ul>
      <h3>レベルにおける利点</h3>
      <table>
        <tr>
          <th></th>
          <th>Level 1</th>
          <th>Level 2</th>
          <th>Level 3</th>
          <th>Level 4</th>
          <th>Level 5</th>
        </tr>
        <tr>
          <td>場所の追加・レビューを作成</td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>レビューの著者を表示</td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>公式サイトを編集</td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>トイレ有無を編集</td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>場所の大きさ</td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>支払い方法を編集</td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>カテゴリーを編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>地図を編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>概要を編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
          <td><FiCheck/></td>
        </tr>
        <tr>
          <td>タイトルを編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><FiCheck/></td>
        </tr>
      </table>
      <End>
        このさきコンテンツはないです。
        <br/>
        No More Content.
      </End>
      <Footer type={'blur'}/>
    </MainBody>
  )
}
