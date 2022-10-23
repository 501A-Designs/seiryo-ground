import { styled } from '../stitches.config'

const TextAreaStyled = styled('textarea',{
  padding:'1em',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$sgGray1',
  border: '1px solid transparent',
  resize: 'vertical',
  minHeight:'100px',
  fontFamily: '$sgFont1',
  transition: '$speed2',
  '&:focus':{
    backgroundColor:'transparent',
    border: '1px solid $sgGray2',
    boxShadow: '$shadow1'
  }
});

export default function TextArea(props) {
  return (
    <TextAreaStyled
      // vertical={props.vertical}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}