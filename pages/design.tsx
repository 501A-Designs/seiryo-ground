import React, { useState } from 'react'
import Margin from '../lib/alignment/Margin'
import Container from '../lib/component/Container'
// import Grid from '../lib/alignment/Grid'
// import AlignItems from '../lib/alignment/AlignItems'
// import mountainGreen1 from '../public/concept/sg-mountain.png'
// import mountainGreen2 from '../public/concept/sg-mountain2.png'

import Grid from '../lib/alignment/Grid';
import { typeButtonArray } from '../lib/component/button/buttonData';
import TypeButton from '../lib/component/button/TypeButton';
import AlignItems from '../lib/alignment/AlignItems';
import RadioInput from '../lib/component/input/RadioInput';
import { Size } from '../lib/util/types';
import ToggleInput from '../lib/component/input/ToggleInput';


export default function Design() {
  const [binaryToggle, setBinaryToggle] = useState(true);
  const [sizeSelect, setSizeSelect] = useState<Size>('m');
  const [typeInput, setTypeInput] = useState('green');

  return (
    <Margin>
      <h1>SEIRYO Designs</h1>
      <h2>Philosophy</h2>
      <p>
        SEIRYO GROUNDは、純粋であり、遊び心もある機能的なデザインを心がけています。自然的な動きを取り入れつつ、コンポーネントとしてまとめることで、スケーラブルでありかつ機能的なUIを作り上げるよう努力しています。UXを通し人との交流を大事にして行きたいです。より良いモノにするため、様々な可能性を探求しています。デザインは、シンプルかつ効率的であるものを心がけ、感覚などを大事にしています。ボタンを押した時にどういったフィードバックを与えるかや、どのようにすれば二次元であるUIに三次元の軸・リアルさを与えるかの探究を行なっています。レイアウトも、わかりやすい構成で、使い勝手の良いものにするよう意識し、視覚的要素は、精巧に作り込み、初めてみた人でも理解しやすいものにし、視認性が高いものを創り上げるよう努力しています。清潔な印象を与え、心地よい環境を提供するために、シンプルで純粋なデザイン、そして、簡素さと、実用性を兼ね備え、コンセプトから抜けた実際の使用に向いている機能性あるデザインを実現しています。
      </p>
      <h2>UI Elements</h2>
      <Grid
        grid={'tri'}
        gap={'small'}
        css={{
          margin:'1.5em 0'
        }}
      >

        <Container styleType={'white'}>
          <ToggleInput
            state={binaryToggle}
            onClick={()=>setBinaryToggle(!binaryToggle)}
          />
        </Container>

        <Container styleType={'white'}>
          <RadioInput
            state={sizeSelect}
            handleChange={(val:Size)=>setSizeSelect(val)}
          />
        </Container>
        
        <Container styleType={'white'}>
          <AlignItems justifyContent={'center'}>
            <TypeButton>
              {typeButtonArray.map(color =>{
                return <TypeButton.Item
                  key={color}
                  type={color}
                  onClick={()=>setTypeInput(color)}
                  selectedInput={typeInput}
                />
              })}
            </TypeButton>
          </AlignItems>
        </Container>
      </Grid>
      <p>
        
      </p>

      <h2>Headings</h2>
      <p>
        フォントにも拘りました。長く悩んだ結果、最終的には「Clash Display」というフォントを使用することにしました。これに加え、pタグは他のテキストより薄い灰色にし、ヘッダータグは全て黒に設定しました。これに加え、フォントウェイトもヘッダー以外全て通常400にし、ヘッダーは少し太字になる500にしました。
      </p>
      <table>
        <tr>
          <th>Descriptor</th>
          <th>Sample Text</th>
        </tr>
        <tr>
          <td>Header 1</td>
          <td><h1>SEIRYO GROUND</h1></td>
        </tr>
        <tr>
          <td>Header 2</td>
          <td><h2>SEIRYO GROUND</h2></td>
        </tr>
        <tr>
          <td>Header 3</td>
          <td><h3>SEIRYO GROUND</h3></td>
        </tr>
        <tr>
          <td>Header 4</td>
          <td><h4>SEIRYO GROUND</h4></td>
        </tr>
        <tr>
          <td>Header 5</td>
          <td><h5>SEIRYO GROUND</h5></td>
        </tr>
        <tr>
          <td>Header 6</td>
          <td><h6>SEIRYO GROUND</h6></td>
        </tr>
        <tr>
          <td>Paragraph</td>
          <td><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, omnis.</p></td>
        </tr>
      </table>
    </Margin>
  )
}
