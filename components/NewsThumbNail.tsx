import { useRouter } from 'next/router'
import { styled } from '../../stitches.config';
import useSound from 'use-sound';

const NewsThumbNailStyled = styled('div',{
  cursor:'pointer',
  background:'$gray1',
  color:'$gray10',
  
  borderTop: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, transparent 0%, $gray4 80%,transparent 100%)',
  borderImageSlice: 1,

  padding:'1em',
  display:'flex',
  flexDirection:'column',
  justifyContent: 'space-between',

  borderRadius: '$r2',
  transition: '$speed1',
  'h3':{
    margin:0
  },
  'time':{
    fontSize:'$9'
  },

  '&:hover':{
    backgroundColor:'$gray4',
  }
})

export default function PostThumbNail(props) {
  const router = useRouter();
  const [action3] = useSound('/sound/action-3-sg.mp3');

  return (
    <NewsThumbNailStyled
      key={props.key}
      onClick={()=> {
        router.push(`/news/${props.slug}`);
        action3();
      }}
    >
      <h3>{props.title}</h3>
      <time>Created At：{props.date}</time>
    </NewsThumbNailStyled>
  )
}
