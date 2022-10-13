import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems'
import Button from '../button/Button'
import TypeButton from '../button/TypeButton'
import StaticGrid from '../alignment/StaticGrid'
import TextArea from '../TextArea'
import Input from '../Input'
import Select from 'react-select'

import { db } from '../../firebase'
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router'
import { buttonSound, notificationSound, selectSound, typeSound } from '../ux/audio'
import { prefectureData } from '../../prefectureData'
import { popOut } from '../ux/keyframes'
import { FiPlus, FiSearch, FiSend } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import CreateContainer from '../component/CreateContainer'

const selectStyle = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'black' : 'white',
    color: state.isSelected ? 'white' : 'black',
    padding: '0.5em 1em',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgb(244, 244, 244)',
      color:'black'
    }
  }),
  control: base => ({
    ...base,
    borderRadius:'10px',
    width: '100%',
    padding:'0.2em',
    fontSize: '0.8em',
    outline: 'none',
    boxShadow: 'none',
    borderColor: 'rgb(244, 244, 244)',
    backgroundColor: 'rgb(244, 244, 244)',
    color: 'rgb(230, 230, 230)',
    "&:hover": {
      borderColor: "rgb(230, 230, 230)"
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
}

export default function CreatePlaceForm(props) {
  const router = useRouter();
  let user = props.user;

  const typeButtonArray = ["green","blue","red","purple",]

  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [prefectureInput, setPrefectureInput] = useState();
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
        prefecture: prefectureInput,
        description: descriptionInput,
        authorUid:user.uid,
        type: typeInput,
        officialSite:officialSiteInput,
        likes:[]
      });
      setPlaceInput('');
      setLocationInput('');
      setDescriptionInput('');
      setTypeInput('');
      setPublished(true);
      setNewPlace(docRef);
      notificationSound();
    }
  }

  return (
    <CreateContainer>
      {!published &&
        <AlignItems justifyContent={'center'}>
          <h3>新しい場所を追加</h3>
        </AlignItems>
      }
      <StaticGrid gap={'1em'}>
        {published ?
          <>
            <h3>
              SEIRYO GROUNDへの貢献<br/>
              ありがとうございます。
            </h3>
            <p>
              追加されました場所は以下からアクセスできます
            </p>
            <AlignItems justifyContent={'center'}>
              <Button
                iconPosition={'left'}
                icon={<FiSearch/>}
                onClick={()=> {
                  buttonSound();
                  router.push(`/place/${newPlace.id}/`);
                }}
              >
                追加した場所のページを閲覧
              </Button>
              <Button
                iconPosition={'left'}
                icon={<FiPlus/>}
                onClick={()=> {
                  buttonSound();
                  setPublished(false);
                }}
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
                onChange={(e)=>{
                  typeSound();
                  setPlaceInput(e.target.value)
                }}
              />
              <TextArea
                placeholder={"概要"}
                value={descriptionInput}
                onChange={(e)=>{
                  typeSound();
                  setDescriptionInput(e.target.value)
                }}
              />
              <Input
                placeholder={"公式サイト（無い場合は空欄）"}
                value={officialSiteInput}
                onChange={(e)=>{
                  typeSound();
                  setOfficialSiteInput(e.target.value)
                }}
              />
            </StaticGrid>
            <div className="grid-2fr-1fr">
              <StaticGrid gap={'0.25em'}>
                <Select
                  styles={selectStyle}
                  options={prefectureData}
                  components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                  onChange={(e)=>{
                    selectSound();
                    setPrefectureInput(e.value);
                  }}
                  placeholder={'都道府県を選択'}
                />
                <Input
                  placeholder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
                  value={locationInput}
                  onChange={(e)=>{
                    typeSound();
                    setLocationInput(e.target.value)
                  }}
                />
                <iframe
                  src={`https://www.google.com/maps?output=embed&q=${locationInput}`}
                  width="100%"
                  height="250px"
                />
              </StaticGrid>
              <div>
                <StaticGrid>
                  {typeButtonArray.map(color =>{
                    return <TypeButton
                      key={color}
                      type={color}
                      onClick={()=>{
                        selectSound();
                        setTypeInput(color);
                      }}
                      selectedInput={typeInput}
                    />
                  })}
                </StaticGrid>
              </div>
            </div>
            {
              placeInput && 
              // descriptionInput && 
              prefectureInput && 
              locationInput && 
              typeInput &&
              <AlignItems justifyContent={'center'}>
                <Button
                  color='black'
                  iconPosition={'right'}
                  icon={<FiSend/>}
                  onClick={()=>{
                    buttonSound();
                    createNewPlace()
                  }}
                >
                  公開
                </Button>
              </AlignItems>
            }
          </>
        }
      </StaticGrid>
    </CreateContainer>
  )
}
