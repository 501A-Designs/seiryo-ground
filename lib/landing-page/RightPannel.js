import { styled } from "../../stitches.config"


const RightPannelStyled = styled('div', {
  width:'100%',
  overflowY:'scroll',
  borderRadius:'$r4 $r4 0 0',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
})

export default function RightPannel(props) {
  return (
    <RightPannelStyled>
      {props.children}
    </RightPannelStyled>
  )
}
