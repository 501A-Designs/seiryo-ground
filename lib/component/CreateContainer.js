import { styled } from "../../stitches.config"

const CreateContainerStyled = styled('div', {
  border: '1px solid $sgGray2',
  boxShadow: '$shadow1',
  borderRadius: '$r3',
  padding: '1em',
  // animation: `${popOut} 0.4s`,
  'h3':{
    textAlign: 'center',
  },
  'p':{
    textAlign: 'center',
  }
})

export default function CreateContainer({children}) {
  return (
    <CreateContainerStyled>{children}</CreateContainerStyled>
  )
}
