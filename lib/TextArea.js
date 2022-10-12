import { styled } from '../stitches.config'

const TextAreaStyled = styled('textarea',{
  padding:'1em',
  outline: 'none',
  borderRadius: '$r2',
  backgroundColor: '$sgGray1',
  border: '1px solid transparent',
  variants: {
    resize: {
      vertical: {
        resize: 'vertical'
      },
      horizontal: {
        resize: 'horizontal'
      },
    },
  },
  minHeight:'100px',
  '&:focus':{
    backgroundColor:'transparent',
    border: '1px solid $sgGray2'
  }
});

export default function TextArea(props) {
  return (
    <TextAreaStyled vertical={props.vertical}/>
  );
}