import React,{useState} from 'react'
import AlignItems from './AlignItems'
import Button from './Button'
import StaticGrid from './StaticGrid'
import TextArea from './TextArea'
import Input from './Input'
import TypeButton from './TypeButton'
import { VscAdd, VscClose,VscRocket, VscSearch } from 'react-icons/vsc'

import { db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router'

export default function CreatePlaceForm(props) {
  const router = useRouter();
  let user = props.user;
  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [officialSiteInput, setOfficialSiteInput] = useState('');

  const [published, setPublished] = useState(false);

  const [newPlace, setNewPlace] = useState();

  const createNewPlace = async() => {
    if (user) {
      const docRef = await addDoc(collection(db, "places"), {
        name: placeInput,
        location: locationInput,
        description: descriptionInput,
        authorUid:user.uid,
        type: typeInput,
        officialSite:officialSiteInput,
        likes:0
      });
      // setCreateNew(false);
      setPlaceInput('');
      setLocationInput('');
      setDescriptionInput('');
      setTypeInput('');
      setPublished(true);
      setNewPlace(docRef);
    }
  }

  return (
    <div
      style={{
        border: '1px solid var(--sgGray)',
        padding: '1em',
        boxShadow: '0px 0px 15px #f0f0f0',
        borderRadius: '10px',
        margin: '1em 0'
      }}
      ref={props.ref}
    >
      <AlignItems spaceBetween={true}>
        {published ? <br/>:<h3>新規作成</h3>}
        <Button
          iconPosition={'left'}
          icon={<VscClose/>}
          onClick={props.closeThisForm}
        >
          閉じる
        </Button>
      </AlignItems>
      <StaticGrid gap={'1em'}>
        {published ?
          <>
            <h3 style={{textAlign: 'center'}}>SEIRYO GROUNDへの貢献<br/>ありがとうございます。</h3>
            <p style={{textAlign: 'center'}}>追加されました場所は以下からアクセスできます</p>
            <AlignItems justifyContent={'center'}>
              <Button
                iconPosition={'left'}
                icon={<VscSearch/>}
                onClick={()=> router.push(`/place/${newPlace.id}/`)}
              >
                追加した場所のページを閲覧
              </Button>
              <Button
                iconPosition={'left'}
                icon={<VscAdd/>}
                onClick={()=> setPublished(false)}
              >
                また新しく追加
              </Button>
            </AlignItems>
          </>:
          <>
            <StaticGrid gap={'0.25em'}>
              <Input
                placeholder={"場所の名前"}
                value={placeInput}
                onChange={(e)=>setPlaceInput(e.target.value)}
              />
              <TextArea
                placeholder={"概要"}
                value={descriptionInput}
                onChange={(e)=>setDescriptionInput(e.target.value)}
              />
              <Input
                placeholder={"公式サイト（無い場合は空欄）"}
                value={officialSiteInput}
                onChange={(e)=>setOfficialSiteInput(e.target.value)}
              />
            </StaticGrid>
            <div className="grid-2fr-1fr">
              <StaticGrid gap={'0.25em'}>
                <Input
                  placeholder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
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
                <StaticGrid>
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
              <AlignItems justifyContent={'center'}>
                <Button
                  iconPosition={'right'}
                  icon={<VscRocket/>}
                  onClick={()=>createNewPlace()}
                >
                  公開
                </Button>
              </AlignItems>
            }
          </>
        }
      </StaticGrid>
    </div>
  )
}
