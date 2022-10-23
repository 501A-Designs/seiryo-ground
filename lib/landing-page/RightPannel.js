import { FiCornerLeftUp } from "react-icons/fi";
import { styled } from "../../stitches.config"
import AlignItems from "../alignment/AlignItems";
import Button from "../button/Button";
import End from "../End";
import { scroll } from "../ux/scroll";


const RightPannelStyled = styled('div', {
  // width:'100%',
  // overflowY:'scroll',
  // borderRadius:'$r4 $r4 0 0',
  // minHeight:'100vh',
  '@desktop':{
    width: '75%',
  },
  '@tablet':{
    width: '80%',
  },
  '@mobile':{
    width: '100%',
  },
  '&::-webkit-scrollbar': {
    width: '0px',
  },
})

export default function RightPannel(props) {
  return (
    <RightPannelStyled>
      {props.children}
      <AlignItems justifyContent={'center'}>
        <Button
          color="white"
          iconPosition={'left'}
          icon={<FiCornerLeftUp/>}
          onClick={()=>{scroll.scrollToTop();}}
        >
          上へ戻る
        </Button>
      </AlignItems>
      <End>
        おわり。
        <br/>
        The End.
      </End>
    </RightPannelStyled>
  )
}
