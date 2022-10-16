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
import { FiPlus, FiSearch, FiSend } from 'react-icons/fi'
import CreateContainer from '../component/CreateContainer'
import Grid from '../alignment/Grid'
import SizeSelect from '../button/SizeSelect'
import SizeSelectContainer from '../button/SizeSelectContainer'
import Container from '../component/Container'
import BinaryToggle from '../button/BinaryToggle'
import BinaryToggleContainer from '../button/BinaryToggleContainer'
import CheckBox from '../button/CheckBox'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../button/buttonData'

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
  const [binaryToggle, setBinaryToggle] = useState(false);
  const [costCheckBox, setCostCheckBox] = useState([]);

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
        size:sizeSelect,
        toilet:binaryToggle,
        type: typeInput,
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

  return (
    <CreateContainer>
      {!published &&
        <AlignItems justifyContent={'center'}>
          <h3>新しい場所を追加</h3>
        </AlignItems>
      }
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
            <Grid grid={'oneTwo'} gap={'small'}>
              <Grid gap={'extraSmall'}>
                <h4>基本情報</h4>
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
                <h4>場所</h4>
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
            <Grid grid={'tri'} gap={'small'}>
              <Grid gap={'extraSmall'}>
                <h4>場所の大きさ</h4>
                <SizeSelectContainer
                  currentState={sizeSelect}
                >
                  {sizeButtonArray.map(size=>{
                    return <SizeSelect
                      name={size}
                      currentState={sizeSelect}
                      onClick={()=> {
                        selectSound();
                        setSizeSelect(size);
                      }}
                    />
                  })}
                </SizeSelectContainer>
              </Grid>
              <Grid gap={'extraSmall'}>
                <h4>トイレの有無</h4>
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
              </Grid>
              <Grid gap={'extraSmall'}>
                <h4>分類</h4>
                <Grid>
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
              </Grid>
            </Grid>
            <Grid>
              <h4>金額・支払い方法</h4>
              <Grid grid={'quad'} gap={'extraSmall'}>
                {costButtonArray.map(name =>{
                  return(
                    <CheckBox
                      checked={costCheckBox.some(element => element === name)}
                      name={name}
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
            </Grid>

            {
              placeInput && 
              descriptionInput && 
              prefectureInput && 
              locationInput && 
              typeInput &&
              sizeSelect &&
              binaryToggle &&
              <>
                <hr/>
                <p>よく内容を確認した上で公開してください。一度公開すると<a>Level 3 Contributor</a>になるまで編集することできないのでご了承ください。</p>
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
              </>
            }
          </>
        }
      </Grid>
    </CreateContainer>
  )
}
