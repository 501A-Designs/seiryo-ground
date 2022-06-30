import React,{useState} from 'react'
import AlignItems from './AlignItems'
import Button from './Button'
import StaticGrid from './StaticGrid'
import TextArea from './TextArea'
import Input from './Input'
import TypeButton from './TypeButton'
import { VscClose,VscRocket } from 'react-icons/vsc'

import { db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";

export default function CreatePlaceForm(props) {
  let user = props.user;
  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [officialSiteInput, setOfficialSiteInput] = useState('');

  const [published, setPublished] = useState(false);

  const createNewPlace = async() => {
    if (user) {
      const docRef = await addDoc(collection(db, "places"), {
        name: placeInput,
        location: locationInput,
        description: descriptionInput,
        authorUid:user.uid,
        type: typeInput,
        officialSite:officialSiteInput,
      });
    }
    // setCreateNew(false);
    setPlaceInput('');
    setLocationInput('');
    setDescriptionInput('');
    setTypeInput('');
    setPublished(true);
  }

  return (
    <div
      style={{
        border: '1px solid var(--sgGray)',
        padding: '1em',
        boxShadow: '0px 0px 15px #f0f0f0'
      }}
      ref={props.ref}
    >
      <StaticGrid gap={'1em'}>
        <AlignItems spaceBetween={true}>
          <h3 style={{margin:0}}>{published ? '公開済み':'新規作成'}</h3>
          <Button
            iconPosition={'left'}
            icon={<VscClose/>}
            onClick={props.closeThisForm}
          />
        </AlignItems>
        {published ?
          <>
            <h2>SEIRYO GROUNDへの貢献<br/>ありがとうございます。</h2>
            <h3>追加されました場所は以下からアクセスできます</h3>
            <StaticGrid>
              <Button>追加した場所のページを閲覧</Button>
              <Button onClick={()=> setPublished(false)}>また新しく追加</Button>
            </StaticGrid>
          </>:
          <>
            <StaticGrid>
              <Input
                placeHolder={"場所の名前"}
                value={placeInput}
                onChange={(e)=>setPlaceInput(e.target.value)}
              />
              <TextArea
                placeHolder={"概要"}
                value={descriptionInput}
                onChange={(e)=>setDescriptionInput(e.target.value)}
              />
              <Input
                placeHolder={"公式サイト（無い場合は空欄）"}
                value={officialSiteInput}
                onChange={(e)=>setOfficialSiteInput(e.target.value)}
              />
            </StaticGrid>
            <div className="grid-2fr-1fr">
              <StaticGrid>
                <Input
                  placeHolder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
                  value={locationInput}
                  onChange={(e)=>setLocationInput(e.target.value)}
                />
                <iframe
                  src={`https://www.google.com/maps?output=embed&q=${locationInput}`}
                  width="100%"
                  height="250px"
                />
              </StaticGrid>
              <div>
                <StaticGrid gap={'0.5em'}>
                  <TypeButton
                    type="green"
                    onClick={()=>setTypeInput('green')}
                    selectedInput={typeInput}
                  />
                  <TypeButton
                    type="blue"
                    onClick={()=>setTypeInput('blue')}
                    selectedInput={typeInput}
                  />
                  <TypeButton
                    type="red"
                    onClick={()=>setTypeInput('red')}
                    selectedInput={typeInput}
                  />
                  <TypeButton
                    type="purple"
                    onClick={()=>setTypeInput('purple')}
                    selectedInput={typeInput}
                  />
                </StaticGrid>
              </div>
            </div>
            {placeInput && descriptionInput && locationInput && typeInput &&
              <AlignItems spaceBetween={true}>
                {/* <Button iconPosition={'left'} icon={<VscSave/>}>保存</Button> */}
                <br/>
                <AlignItems>
                  <Button
                    iconPosition={'right'}
                    icon={<VscRocket/>}
                    onClick={()=>createNewPlace()}
                  >
                    公開
                  </Button>
                </AlignItems>
              </AlignItems>
            }
          </>
        }
      </StaticGrid>
    </div>
  )
}
