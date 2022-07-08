import { doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import { db } from '../firebase';
import AlignItems from './AlignItems'
import StaticGrid from './StaticGrid';
import TypeBadge from './TypeBadge';

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
      key={props.key}
      style={{
        padding:'2em 1em',
        borderTop:'1px solid var(--sgGray)',
        cursor:'pointer'
      }}
      onClick={()=>router.push(`/place/${props.documentId}`)}
    >
      <StaticGrid gap={'0.5em'}>
        <h4 style={{margin:0}}>{placeData && placeData.name}</h4>
        <TypeBadge type={placeData && placeData.type} short={true}/>
      </StaticGrid>
    </div>
  )
}
