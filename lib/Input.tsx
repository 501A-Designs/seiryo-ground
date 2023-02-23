import useSound from 'use-sound';
import { styled } from '../stitches.config'

const InputStyled = styled('input', {
  fontSize: '$8',
  padding:'$medium',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$gray3',
  border: '1px solid $gray4',
  userSelect: 'none',
  transition: '$speed2',
  '&:focus':{
    backgroundColor: '$gray1',
    borderColor: '$gray5',
  }
})

export default function Input(props) {
  const [tap3] = useSound('/sound/tap-3-sg.mp3',{playbackRate:1.1});

  return (
    <InputStyled
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={()=>tap3()}
    />
  )
}
