import { styled } from '../stitches.config'

const InputStyled = styled('input', {
  fontFamily: '$sgFont1',
  padding:'$small $medium',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$gray3',
  border: '1px solid $gray3',
  userSelect: 'none',
  transition: '$speed2',
  '&:focus':{
    backgroundColor: '$gray2',
    borderColor: '$gray5',
    // boxShadow: '$shadow1'
  }
})

export default function Input(props) {
  return (
    <InputStyled
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  )
}
