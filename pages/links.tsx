import React from 'react'
import Margin from '../lib/alignment/Margin'
import Link from 'next/link'

export default function Links() {
  return (
    <Margin>
      <h1>Links</h1>
      <p>本サイトのリンク集</p>
      <ul>
        <li>
          <Link href={'/design'}>About</Link> - SEIRYO GROUNDについて
        </li>
        <li>
          <Link href={'/design'}>SEIRYO News</Link> - ニュースページ
        </li>
        <li>
          <Link href={'/design'}>SEIRYO Design</Link> - デザインについて
        </li>
        <li>
          <Link href={'/tos'}>利用規約</Link> - 本サイトを使用する利用する上でのルール
        </li>
        <li>
          <Link href={'/tos'}>SEIRYO Card</Link> - カード・レベルについて
        </li>
        <li>
          <Link href={'/tos'}>Profile</Link> - ユーザー様の情報・カードを閲覧
        </li>
      </ul>
    </Margin>
  )
}
