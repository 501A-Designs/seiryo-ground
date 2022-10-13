import { styled } from '../stitches.config'

const InputStyled = styled('input', {
  padding:'1em',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$sgGray1',
  border: '1px solid transparent',
  fontFamily: '$sgFont1',
  userSelect: 'none',
  '&:focus':{
    backgroundColor: 'white',
    border: '1px solid $sgGray3'
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
