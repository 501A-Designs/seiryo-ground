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
  return (
    <TextAreaStyled
      // vertical={props.vertical}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
}