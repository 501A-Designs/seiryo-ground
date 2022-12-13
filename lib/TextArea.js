import { styled } from '../stitches.config'

const TextAreaStyled = styled('textarea',{
  fontFamily: '$sgFont1',
  padding:'$small $medium',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$gray3',
  border: '1px solid $gray3',
  resize: 'vertical',
  minHeight:'100px',
  transition: '$speed2',
  '&:focus':{
    backgroundColor: '$gray2',
    borderColor: '$gray5',
    // boxShadow: '$shadow1'
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