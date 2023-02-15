import React from 'react'
import Margin from '../lib/alignment/Margin'
import Container from '../lib/component/Container'
import Grid from '../lib/alignment/Grid'
import AlignItems from '../lib/alignment/AlignItems'

export default function design() {
  return (
    <Margin>
      <h1>SEIRYO Design</h1>
      


      <Grid grid={'duo'} gap={'small'}>
        <Grid>
          <h2>Goal</h2>
          <p>
            純粋であり、遊び心もある機能的なデザインを目指しています。自然的な動きを取り入れつつ、コンポーネントとしてまとめることができ、スケーラブルで意味で機能的な部分を取り入れました。
          </p>
        </Grid>
        <Grid gap={'small'}>
          <h2>Concepts</h2>
          <Container styleType={'white'}>
            <p>
              Consistance & Purity.
            </p>
          </Container>
          <Container styleType={'white'}>
            <p>
              Consistance & Purity.
            </p>
          </Container>
          <Container styleType={'white'}>
            <p>
              Consistance & Purity.
            </p>
          </Container>
        </Grid>
      </Grid>

      <h2>Design System</h2>
      <h3>Typeface</h3>
      <Container styleType={'white'}>
        <h4>Font</h4>
        <p>
          フォントに関する情報
        </p>
        <ul>
          <li>フォント：Clash Display</li>
          <li>フォントデザイン：Indian Type Foundry</li>
        </ul>
      </Container>
      <Container styleType={'white'}>
        <h4>Textual Hierarchy</h4>
        <p>
          Headingのテキストは全てbold500です。
        </p>
        <table>
          <tr>
            <th>Descriptor</th>
            <th>Value</th>
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
          <tr>
            <td>Paragraph</td>
            <td><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum, omnis.</p></td>
          </tr>
        </table>
      </Container>


      <AlignItems justifyContent={'center'}>
        <p>DESIGNED & DEVELOP BY 501A</p>
      </AlignItems>
    </Margin>
  )
}
