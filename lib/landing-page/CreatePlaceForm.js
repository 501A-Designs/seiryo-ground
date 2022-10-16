import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems'
import Button from '../button/Button'
import TypeButton from '../button/TypeButton'
import TextArea from '../TextArea'
import Input from '../Input'
import Select from 'react-select'

import { db } from '../../firebase'
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/router'
import { buttonSound, notificationSound, selectSound, typeSound } from '../ux/audio'
import { prefectureData } from '../../prefectureData'
import { FiAlertTriangle, FiArrowLeft, FiArrowRight, FiPlus, FiSearch, FiSend } from 'react-icons/fi'
import CreateContainer from '../component/CreateContainer'
import Grid from '../alignment/Grid'
import SizeSelect from '../button/SizeSelect'
import SizeSelectContainer from '../button/SizeSelectContainer'
import Container from '../component/Container'
import BinaryToggle from '../button/BinaryToggle'
import BinaryToggleContainer from '../button/BinaryToggleContainer'
import CheckBox from '../button/CheckBox'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../button/buttonData'
import FlipThrough from '../component/FlipThrough'
import Link from 'next/link'

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

  const [sizeSelect, setSizeSelect] = useState('medium');
  const [binaryToggle, setBinaryToggle] = useState(true);
  const [typeInput, setTypeInput] = useState('green');
  const [costCheckBox, setCostCheckBox] = useState(['free']);

  const [placeInput, setPlaceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [prefectureInput, setPrefectureInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState('');
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
        size:sizeSelect,
        toilet:binaryToggle,
        type: typeInput,
        cost: costCheckBox,
        officialSite:officialSiteInput,
        likes:[],
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

  const [section, setSection] = useState(1)

  return (
    <CreateContainer>
      <Grid gap={'medium'}>
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
            <AlignItems
              gap={'0'}
              justifyContent={'center'}
              margin={'1em 0'}
              flexDirection="column"
            >
              <h3 style={{margin: '0'}}>
                {section == 1 && '新しい場所を追加'}
                {section == 2 && '場所の大きさ'}
                {section == 3 && 'トイレの有無'}
                {section == 4 && '種類'}
                {section == 5 && '入場時の支払い方法'}
              </h3>
              <strong style={{margin: '0'}}>{section}/5</strong>
            </AlignItems>
            {section == 1 && 
              <>
                <Grid grid={'oneTwo'} gap={'small'}>
                  <Grid gap={'extraSmall'}>
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
                      placeholder={"公式サイト（無い場合は空欄）"}
                      value={officialSiteInput}
                      onChange={(e)=>{
                        typeSound();
                        setOfficialSiteInput(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid gap={'extraSmall'}>
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
                  </Grid>
                </Grid>
                {
                  placeInput && 
                  descriptionInput && 
                  prefectureInput && 
                  locationInput && 
                  <AlignItems justifyContent={'center'}>
                    <Button
                      color='black'
                      iconPosition={'right'}
                      icon={<FiArrowRight/>}
                      onClick={()=>{
                        setSection(2)
                      }}
                    >
                      次へ
                    </Button>
                  </AlignItems>
                }
              </>
            }

            {section == 2 &&
              <FlipThrough
                leftClick={()=>setSection(1)}
                rightClick={()=>setSection(3)}
              >
                <Container>
                  <SizeSelectContainer
                    currentState={sizeSelect}
                  >
                    {sizeButtonArray.map(size=>{
                      return <SizeSelect
                        name={size}
                        key={size}
                        currentState={sizeSelect}
                        onClick={()=> {
                          selectSound();
                          setSizeSelect(size);
                        }}
                      />
                    })}
                  </SizeSelectContainer>
                </Container>
              </FlipThrough>
            }

            {section == 3 &&    
              <FlipThrough
                leftClick={()=>setSection(2)}
                rightClick={()=>setSection(4)}
              >
                <Container>
                  <Container type={'standard'}>
                    <BinaryToggleContainer>
                      <BinaryToggle
                        currentState={binaryToggle}
                        selected={binaryToggle === true}
                        onClick={()=>{
                          selectSound();
                          setBinaryToggle(true)
                        }}
                      >
                        有
                      </BinaryToggle>
                      <BinaryToggle
                        currentState={binaryToggle}
                        selected={binaryToggle === false}
                        onClick={()=>{
                          selectSound();
                          setBinaryToggle(false)
                        }}
                      >
                        無
                      </BinaryToggle>
                    </BinaryToggleContainer>
                  </Container>
                </Container>
              </FlipThrough>
            }

            {section == 4 &&
              <FlipThrough
                leftClick={()=>setSection(3)}
                rightClick={()=>setSection(5)}
              >
                <AlignItems justifyContent={'center'}>
                  <Grid gap={'extraSmall'}>
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
                  </Grid>
                </AlignItems>
              </FlipThrough>
            }

            {section == 5 &&
              <FlipThrough
                leftClick={()=>setSection(4)}
                rightClick={()=>setSection(5)}
                publish={
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
                }
                bottomBanner={
                  <Container type="standard">
                    <p>※よく内容を確認した上で公開してください。一度公開すると<Link href="/levels"><a>Level 3 Contributor</a></Link>になるまでは編集することできないのでご了承ください。また、記入された内容は清涼広場の利用規約に反していないものであるようお願い致します。</p>
                  </Container>
                }
              >
                <AlignItems justifyContent={'center'}>                  
                  <Grid gap={'extraSmall'}>
                    {costButtonArray.map(name =>{
                      return(
                        <CheckBox
                          checked={costCheckBox.some(element => element === name)}
                          name={name}
                          key={name}
                          onClick={()=>
                            {
                              selectSound();
                              costCheckBox.some(element => element === name) ?
                              setCostCheckBox(prev => prev.filter(element => element !== name )):
                              setCostCheckBox([...costCheckBox, name]);
                            }
                          }
                        >
                          {name}
                        </CheckBox>
                      )
                    })}
                  </Grid>
                </AlignItems>
              </FlipThrough>
            }
          </>
        }
      </Grid>
    </CreateContainer>
  )
}
