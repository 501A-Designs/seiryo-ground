import { useRouter } from 'next/router'
import { styled } from '../../stitches.config';
import useSound from 'use-sound';
import AlignItems from '../alignment/AlignItems';

const NewsThumbNailStyled = styled('div',{
  cursor:'pointer',
  background:'white',
  color:'black',
  borderBottom:'1px solid $sgGray2',
  padding:'1em',
  display:'flex',
  justifyContent: 'center',
  flexDirection:'column',
  justifyContent: 'space-between',
  transition: '$speed1',
  '&:hover':{
    background:'$sgBlackBackground',
    color:'white',
    borderRadius: '$r3',
    transform:'scale(0.99)',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const [tap1] = useSound('/sound/tap-1-sg.mp3');

  return (
    <NewsThumbNailStyled
      key={props.key}
      onClick={()=> {
        router.push(`/news/${props.slug}`);
        tap1();
      }}
    >
      <h2>{props.title}</h2>
      <AlignItems spaceBetween={true}>
        <time>作成日：{props.date}</time>
      </AlignItems>
    </NewsThumbNailStyled>
  )
}
