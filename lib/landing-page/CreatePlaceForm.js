import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems'
import Button from '../button/Button'
import TypeButton from '../button/TypeButton'
import TextArea from '../TextArea'
import Input from '../Input'
import Select from 'react-select'

import { db } from '../../firebase'
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import { prefectureData } from '../../prefectureData'
import { FiArrowRight, FiPlus, FiSearch, FiSend } from 'react-icons/fi'
import CreateContainer from '../component/CreateContainer'
import Grid from '../alignment/Grid'
import SizeSelectContainer, { SizeSelect } from '../button/SizeSelectContainer'
import Container from '../component/Container'
import BinaryToggleContainer, { BinaryToggle } from '../button/BinaryToggleContainer'
import CheckBox from '../button/CheckBox'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../button/buttonData'
import FlipThrough from '../component/FlipThrough'
import Link from 'next/link';

import useSound from 'use-sound';
import { ClipLoader } from 'react-spinners'
import Dialog from '../component/Dialog'
import { styled } from '../../stitches.config'
import { fillClipPath } from '../ux/keyframes'

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
  const [tap1] = useSound('/sound/tap-1-sg.mp3',{playbackRate:1.1});
  const [tap2] = useSound('/sound/tap-2-sg.mp3',{playbackRate:1.1});
  const [tap3] = useSound('/sound/tap-3-sg.mp3',{playbackRate:1.1});
  const [action1] = useSound('/sound/action-1-sg.mp3',{playbackRate:1.5});
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3',{playbackRate:1.1});
  const [select1] = useSound('/sound/select-1-sg.mp3',{playbackRate:1.1});
  const [select2] = useSound('/sound/select-2-sg.mp3',{playbackRate:1.1});
  const [load1] = useSound('/sound/load-1-sg.mp3');

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
  const [section, setSection] = useState(1)


  const createNewPlace = async() => {
    setSection(0);
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
      await updateDoc(doc(db,`users/${user.uid}`), {
        postCount: increment(1)
      });
      setNewPlace(docRef);
      setPublished(true);

      setPlaceInput('');
      setLocationInput('');
      setDescriptionInput('');
      setPrefectureInput();
      setOfficialSiteInput('');
      setSizeSelect('medium');
      setBinaryToggle(true);
      setTypeInput('green');
      setCostCheckBox(['free']);
      setSection(1)

      celebrate1();
    }
  }


  const ProgressBarStyled = styled('div',{
    height:'10px',
    borderRadius:'$round',
  })
  function ProgressBar(props) {
    return (
      <ProgressBarStyled css={props.css}></ProgressBarStyled>
    )
  }
  


  return (
    <Dialog
      title={
        section == 1 && '新しく追加' || 
        section == 2 && '場所' || 
        section == 3 && '場所の大きさ' || 
        section == 4 && 'トイレの有無' ||
        section == 5 && '種類' ||
        section == 6 && '入場時の支払い方法'
      }
      trigger={
        <Button
          size={'small'}
          styleType={'transparent'}
          icon={<FiPlus/>}
        />
      }
    >
      <Grid gap={'medium'}>
        {published ?
          <>
            <AlignItems
              justifyContent={'center'}
              flexDirection="column"
            >
              <h3>
                SEIRYO GROUNDへの貢献<br/>
                ありがとうございます。
              </h3>
              <p>
                追加されました場所は以下からアクセスできます
              </p>
            </AlignItems>
            <AlignItems justifyContent={'center'}>
              <Button
                color="white"
                iconPosition={'left'}
                icon={<FiSearch/>}
                onClick={()=> {
                  tap1();
                  router.push(`/place/${newPlace.id}/`);
                }}
              >
                追加した場所のページを閲覧
              </Button>
              <Button
                color="white"
                iconPosition={'left'}
                icon={<FiPlus/>}
                onClick={()=> {
                  action1();
                  setPublished(false);
                }}
              >
                また新しく追加
              </Button>
            </AlignItems>
          </>:
          <>
            {section == 0 ?
              <AlignItems
                justifyContent={'center'}
                flexDirection="column"
              >
                <h3>少々お待ちください</h3>
              </AlignItems>:
              <>
                <AlignItems
                  gap={'0'}
                  justifyContent={'center'}
                  margin={'1em 0'}
                  flexDirection="column"
                >
                  <strong>{section}/6</strong>
                </AlignItems>
                <ProgressBar
                  css={{
                    width:`${section/6*100}%`
                  }}
                />
              </>
            }
            {section == 1 && 
              <>
                <Grid gap={'extraSmall'}>
                  <Input
                    placeholder={"場所の名前"}
                    value={placeInput}
                    onChange={(e)=>{
                      tap3();
                      setPlaceInput(e.target.value)
                    }}
                  />
                  <TextArea
                    placeholder={"概要"}
                    value={descriptionInput}
                    onChange={(e)=>{
                      tap3();
                      setDescriptionInput(e.target.value)
                    }}
                  />
                  <Input
                    placeholder={"公式サイト（無い場合は空欄）"}
                    value={officialSiteInput}
                    onChange={(e)=>{
                      tap3();
                      setOfficialSiteInput(e.target.value)
                    }}
                  />
                </Grid>
                {
                  placeInput && 
                  descriptionInput && 
                  <AlignItems justifyContent={'center'}>
                    <Button
                      icon={<FiArrowRight/>}
                      onClick={()=>{
                        tap1();
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
              <Grid gap={'extraSmall'}>                
                <Select
                  styles={selectStyle}
                  options={prefectureData}
                  components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                  onChange={(e)=>{
                    select1();
                    setPrefectureInput(e.value);
                  }}
                  placeholder={'都道府県を選択'}
                />

                <Input
                  placeholder={"場所（スペース無し英語表記｜例：koishikawa-korakuen）"}
                  value={locationInput}
                  onChange={(e)=>{
                    tap3();
                    setLocationInput(e.target.value)
                  }}
                />
                <iframe
                  src={`https://www.google.com/maps?output=embed&q=${locationInput}`}
                  width="100%"
                  height="250px"
                />
                                  {/* prefectureInput && 
                  locationInput &&  */}
              </Grid>
            }

            {section == 3 &&
              <FlipThrough
                leftClick={()=>{tap2();setSection(1)}}
                rightClick={()=>{tap1();setSection(3)}}
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
                          select1();
                          setSizeSelect(size);
                        }}
                      />
                    })}
                  </SizeSelectContainer>
                </Container>
              </FlipThrough>
            }

            {section == 4 &&    
              <FlipThrough
                leftClick={()=>{tap2();setSection(2)}}
                rightClick={()=>{tap1();setSection(4)}}
              >
                <Container>
                  <Container type={'standard'}>
                    <BinaryToggleContainer>
                      <BinaryToggle
                        currentState={binaryToggle}
                        selected={binaryToggle === true}
                        onClick={()=>{
                          select1();
                          setBinaryToggle(true)
                        }}
                      >
                        有
                      </BinaryToggle>
                      <BinaryToggle
                        currentState={binaryToggle}
                        selected={binaryToggle === false}
                        onClick={()=>{
                          select2();
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

            {section == 5 &&
              <FlipThrough
                leftClick={()=>{tap2();setSection(3)}}
                rightClick={()=>{tap1();setSection(5)}}
              >
                <AlignItems justifyContent={'center'}>
                  <Grid gap={'extraSmall'}>
                    {typeButtonArray.map(color =>{
                      return <TypeButton
                        key={color}
                        type={color}
                        onClick={()=>{
                          select1();
                          setTypeInput(color);
                        }}
                        selectedInput={typeInput}
                      />
                    })}
                  </Grid>
                </AlignItems>
              </FlipThrough>
            }

            {section == 6 &&
              <FlipThrough
                leftClick={()=>{tap2();setSection(4)}}
                rightClick={()=>{tap1();setSection(5)}}
                publish={
                  <Button
                    color='black'
                    iconPosition={'right'}
                    icon={<FiSend/>}
                    onClick={()=>{
                      load1();
                      createNewPlace();
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
                              tap1();
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
    </Dialog>
  )
}
