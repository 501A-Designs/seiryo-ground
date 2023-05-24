import React from "react";
import Link from "next/link";
import End from "../../../lib/End";
import { CheckIcon } from "@radix-ui/react-icons";
import Table from "../../../components/general/Table";

const Page = () => {
  return (
    <>
      <h1>SEIRYO CARD</h1>
      <h3>About</h3>
      <p>
        本サイト、「SEIRYO GROUND |
        清涼広場」にログインしたユーザー様はみんなデフォルトでSEIRYO GROUND
        メンバーシップカードをもらいます。ログインしているユーザー様は
        <Link href="/profile">こちら</Link>
        からアクセスできます。カードにはそれぞれ5段階のレベルがあり清涼広場に貢献する頻度と量によってカードのレベルが上がります。
      </p>
      <h3>Milestones</h3>
      <p>カードがアップグレードされるときのマイルストーン：</p>
      <Table
        caption={"レベル別機能使用権限"}
        head={
          <tr>
            <th>Level</th>
            <th>Color</th>
            <th>Description</th>
          </tr>
        }
      >
        <tr>
          <td>1</td>
          <td>白</td>
          <td>ログインした全てのユーザー様</td>
        </tr>
        <tr>
          <td>2</td>
          <td>青</td>
          <td>新しい場所を2ヶ所追加し、レビューを2件追加したユーザー様</td>
        </tr>
        <tr>
          <td>3</td>
          <td>緑</td>
          <td>新しい場所を5ヶ所追加し、レビューを5件追加したユーザー様</td>
        </tr>
        <tr>
          <td>4</td>
          <td>黄</td>
          <td>新しい場所を10ヶ所追加し、レビューを10件追加したユーザー様</td>
        </tr>
        <tr>
          <td>5</td>
          <td>黒</td>
          <td>
            新しい場所を20ヶ所以上追加し、レビューを20件追加したユーザー様
          </td>
        </tr>
      </Table>
      <h3>Perks</h3>
      <Table
        caption={"レベル別機能使用権限"}
        head={
          <tr>
            <th>Levels</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        }
      >
        <tr>
          <td>場所の追加・レビューを作成</td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>レビューの著者を表示</td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>公式サイトを編集</td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>トイレ有無を編集</td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>場所の大きさ</td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>支払い方法を編集</td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>カテゴリーを編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>地図を編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>概要を編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
          <td>
            <CheckIcon />
          </td>
        </tr>
        <tr>
          <td>タイトルを編集</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CheckIcon />
          </td>
        </tr>
      </Table>
      <End>
        このさきコンテンツはないです。
        <br />
        No More Content.
      </End>
      {/* <Footer type={"blur"} /> */}
    </>
  );
};

export default Page;
