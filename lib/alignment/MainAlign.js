import { styled } from "../../stitches.config";

const MainAlignStyled = styled('div', {
  display:'grid',
  height:'100vh',
  '@mobile':{
    gridTemplateColumns: '1fr',
    gap:'0em',
  },
  '@desktop':{
    gridTemplateColumns: 'minmax(150px, 200px) 1fr',
    gap:'1em',
  },
});

export default function MainAlign(props){

  return(
    <MainAlignStyled
      // responsiveDesign={{
      //   '@initial':'computer',
      //   '@bp1':'mobile',
      //   '@bp2':'tablet',
      //   '@bp3':'computer',
      // }}
    >
      {props.children}
    </MainAlignStyled>
  );
}

