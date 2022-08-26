import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';
import AlignItems from './AlignItems'
import { tapSound,buttonSound } from './sound/audio';
import StaticGrid from './StaticGrid';
import TypeBadge from './TypeBadge';
import styles from '../styles/FetchSinglePlace.module.css'

export default function FetchSinglePlace(props) {
  const router = useRouter();
  const [placeData, setPlaceData] = useState();

  const fetchPlaceById = async()=>{
    const placeDocRef = doc(db, `places/${props.documentId}`);
    const docSnap = await getDoc(placeDocRef);
    if (docSnap.exists()) {
      setPlaceData(docSnap.data());
    } else {
      alert("ページは見つかりませんでした");
    }
  }

  useEffect(() => {
    fetchPlaceById();
  }, [props.documentId])
  
  return (
    <div
      className={styles.singlePlace}
      onMouseEnter={()=> tapSound()}
      key={props.key}
      onClick={()=>{
        buttonSound();
        router.push(`/place/${props.documentId}`)
      }}
    >
      <StaticGrid gap={'0.5em'}>
        <h4 style={{margin:0}}>{placeData && placeData.name}</h4>
        <TypeBadge type={placeData && placeData.type} short={true}/>
      </StaticGrid>
    </div>
  )
}
