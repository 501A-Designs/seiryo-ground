import React,{useState} from 'react'
import AlignItems from '../alignment/AlignItems'
import Button from '../button/Button'
import TypeButton from '../button/TypeButton'
import TextArea from '../TextArea'
import Input from '../Input'

import { db } from '../../firebase'
import { addDoc, collection, doc, increment, updateDoc } from "firebase/firestore";
import { useRouter } from 'next/router'
import Grid from '../alignment/Grid'
import CheckBox from '../button/CheckBox'
import { costButtonArray, sizeButtonArray, typeButtonArray } from '../button/buttonData'
import FlipThrough from '../component/FlipThrough'

import useSound from 'use-sound';
import BinaryToggle from '../button/BinaryToggle'
import SizeSelect from '../button/SizeSelect'
import { ArrowRightIcon, MagnifyingGlassIcon, PaperPlaneIcon, PlusIcon } from '@radix-ui/react-icons'
import LoadingBar from 'react-top-loading-bar'

// RADIX
import RadixDialog from '../component/radix/Dialog'
import RadixSelect from '../component/radix/Select'
import Container from '../component/Container'


export default function CreatePlaceForm(props) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  let user = props.user;

  const [action1] = useSound('/sound/action-1-sg.mp3',{playbackRate:1.5});
  const [celebrate1] = useSound('/sound/celebrate-1-sg.mp3',{playbackRate:1.1});
  const [load1] = useSound('/sound/load-1-sg.mp3');

  const [sizeSelect, setSizeSelect] = useState('medium');
  const [binaryToggle, setBinaryToggle] = useState(true);
  const [typeInput, setTypeInput] = useState('green');
  const [costCheckBox, setCostCheckBox] = useState(['free']);

  const [placeInput, setPlaceInput] = useState('');
  const [prefectureInput, setPrefectureInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState('');
  const [officialSiteInput, setOfficialSiteInput] = useState('');

  const [published, setPublished] = useState(false);
  const [newPlace, setNewPlace] = useState(null);
  const [section, setSection] = useState(1);

  const createNewPlace = async() => {
    setSection(0);
    setProgress(70);
  
    if (user) {
      const docRef = await addDoc(collection(db, "places"), {
        name: placeInput,
        prefecture: prefectureInput,
        description: descriptionInput,
        authorUid:user.uid,
        size:sizeSelect,
        toilet:binaryToggle,
        type: typeInput,
        cost: costCheckBox,
        officialSite:officialSiteInput,
        averageRating:{
          access:0,
          date:0,
          management:0,
        },
        likes:[],
      });
      setProgress(80);
      await updateDoc(doc(db,`users/${user.uid}`), {
        postCount: increment(1)
      });
      setNewPlace(docRef);
      setPublished(true);

      setPlaceInput('');
      setDescriptionInput('');
      setPrefectureInput(null);
      setOfficialSiteInput('');
      setSizeSelect('medium');
      setBinaryToggle(true);
      setTypeInput('green');
      setCostCheckBox(['free']);
      setSection(1)

      setProgress(100);
      celebrate1();
    }
  }

  // <Container type="standard">
  //   <p>※よく内容を確認した上で公開してください。一度公開すると<Link href="/levels">Level 3 Contributor</Link>になるまでは編集することできないのでご了承ください。また、記入された内容は清涼広場の利用規約に反していないものであるようお願い致します。</p>
  // </Container>

  return (
    <RadixDialog
      title={
        section == 1 && '新規追加' ||
        section == 2 && '場所' ||
        section == 3 && '大きさ' ||
        section == 4 && 'トイレ有無' ||
        section == 5 && '種類' ||
        section == 6 && '現地での支払い'
      }
      trigger={
        <Button
          size={'small'}
          styleType={'transparent'}
          icon={<PlusIcon/>}
        />
      }
    >
      <LoadingBar
        color={'gray'}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Grid gap={'medium'}>
        {published ?
          <>
            <AlignItems
              justifyContent={'center'}
              flexDirection="column"
            >
              <h3>
                清涼広場への貢献ありがとうございます。
              </h3>
              <p>
                追加されました場所は以下からアクセスできます
              </p>
            </AlignItems>
            <AlignItems justifyContent={'center'}>
              <Button
                iconPosition={'left'}
                icon={<MagnifyingGlassIcon/>}
                onClick={()=> router.push(`/place/${newPlace?.id}/`)}
              >
                追加した場所のページを閲覧
              </Button>
              <Button
                iconPosition={'left'}
                icon={<PlusIcon/>}
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
            {section == 1 && 
              <>
                <Grid gap={'extraSmall'}>
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
                </Grid>
                {
                  placeInput && 
                  descriptionInput && 
                  <AlignItems justifyContent={'center'}>
                    <Button
                      icon={<ArrowRightIcon/>}
                      onClick={()=>{
                        setSection(2);
                        setProgress(10);
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
                leftClick={()=>{
                  setSection(1);
                  setProgress(1);
                }}
                rightClick={()=>{
                  setSection(3);
                  setProgress(20);
                }}
                currentSection={section}
              >
                <Container>
                  <AlignItems justifyContent={'center'}>
                    <RadixSelect
                      placeholder={'選択'}
                      value={prefectureInput}
                      onValueChange={setPrefectureInput}
                    >
                      {props.prefecD.map(obj => {
                        return (
                          <RadixSelect.Item
                            key={obj.iso}
                            value={obj.prefecture_kanji}
                          >
                            {obj.prefecture_kanji}
                          </RadixSelect.Item>
                        )
                      })}
                    </RadixSelect>
                  </AlignItems>
                </Container>
              </FlipThrough>
            }

            {section == 3 &&
              <FlipThrough
                leftClick={()=>{
                  setSection(2);
                  setProgress(10);
                }}
                rightClick={()=>{
                  setSection(4);
                  setProgress(30);
                }}
                currentSection={section}
              >
                <SizeSelect
                  state={sizeSelect}
                >
                  {sizeButtonArray.map(size=>(
                    <SizeSelect.Item
                      key={size}
                      name={size}
                      state={sizeSelect}
                      onClick={()=> setSizeSelect(size)}
                    />
                  ))}
                </SizeSelect>
              </FlipThrough>
            }

            {section == 4 &&    
              <FlipThrough
                leftClick={()=>{
                  setSection(3);
                  setProgress(20);
                }}
                rightClick={()=>{
                  setSection(5);
                  setProgress(40);
                }}
                currentSection={section}
              >
                <BinaryToggle
                  state={binaryToggle}
                  onClick={()=>setBinaryToggle(!binaryToggle)}
                />
              </FlipThrough>
            }

            {section == 5 &&
              <FlipThrough
                leftClick={()=>{
                  setSection(4);
                  setProgress(30);
                }}
                rightClick={()=>{
                  setSection(6);
                  setProgress(50);
                }}
                currentSection={section}
              >
                <AlignItems justifyContent={'center'}>
                  <TypeButton>
                    {typeButtonArray.map(color =>(
                      <TypeButton.Item
                        key={color}
                        type={color}
                        onClick={()=>setTypeInput(color)}
                        selectedInput={typeInput}
                      />
                    ))}
                  </TypeButton>
                </AlignItems>
              </FlipThrough>
            }

            {section == 6 &&
              <FlipThrough
                leftClick={()=>{
                  setSection(5);
                  setProgress(40);
                }}
                publish={
                  <Button
                    styleType={'black'}
                    iconPosition={'right'}
                    icon={<PaperPlaneIcon/>}
                    overRideSound={()=>load1()}
                    onClick={()=>createNewPlace()}
                  >
                    公開
                  </Button>
                }
              >
                <AlignItems justifyContent={'center'}>                  
                  <CheckBox>
                    {costButtonArray.map(name =>{
                      return(
                        <CheckBox.Item
                          checked={costCheckBox.some(element => element === name)}
                          name={name}
                          key={name}
                          onClick={()=>
                            {
                              costCheckBox.some(element => element === name) ?
                              setCostCheckBox(prev => prev.filter(element => element !== name )):
                              setCostCheckBox([...costCheckBox, name]);
                            }
                          }
                        >
                          {name}
                        </CheckBox.Item>
                      )
                    })}
                  </CheckBox>
                </AlignItems>
              </FlipThrough>
            }
          </>
        }
      </Grid>
    </RadixDialog>
  );
}
