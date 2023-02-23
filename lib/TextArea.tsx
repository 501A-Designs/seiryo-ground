import useSound from 'use-sound';
import { styled } from '../stitches.config'

const TextAreaStyled = styled('textarea',{
  padding:'$medium',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$gray3',
  border: '1px solid $gray4',
  resize: 'vertical',
  minHeight:'100px',
  transition: '$speed2',
  '&:focus':{
    backgroundColor: '$gray1',
    borderColor: '$gray5',
    // boxShadow: '$shadow1'
  }
});

export default function TextArea(props) {
  const [tap3] = useSound('/sound/tap-3-sg.mp3',{playbackRate:1.1});

  return (
    <TextAreaStyled
      // vertical={props.vertical}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={()=>tap3()}
    />
  );
}