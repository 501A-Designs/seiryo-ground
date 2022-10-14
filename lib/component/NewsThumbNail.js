import { useRouter } from 'next/router'
import { styled } from '../../stitches.config';
import AlignItems from '../alignment/AlignItems';
import { buttonSound, tapSound } from '../ux/audio';

const NewsThumbNailStyled = styled('div',{
  cursor:'pointer',
  backgroundColor:'white',
  color:'black',
  borderBottom:'1px solid $sgGray2',
  padding:'1em',
  display:'flex',
  justifyContent: 'center',
  flexDirection:'column',
  justifyContent: 'space-between',
  transition: '$speed1',
  '&:hover':{
    backgroundColor:'black',
    color:'white',
    borderRadius: '$r3',
    transform:'scale(0.99)',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  return (
    <NewsThumbNailStyled
      onMouseEnter={()=> tapSound()}
      key={props.key}
      onClick={()=> {
        buttonSound();
        router.push(`/news/${props.slug}`)
      }}
    >
      <h2>{props.title}</h2>
      <AlignItems spaceBetween={true}>
        <time>作成日：{props.date}</time>
      </AlignItems>
    </NewsThumbNailStyled>
  )
}
