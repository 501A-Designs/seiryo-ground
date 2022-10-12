import { styled } from "../../stitches.config";

const MainAlignStyled = styled('div', {
  display:'grid',
  gap:'1em',
  height:'100vh',
  '@bp1':{
    gridTemplateColumns: '1fr',
  },
  '@bp2':{
    gridTemplateColumns: 'minmax(150px, 200px) 1fr',
  },
  '@bp3':{
    gridTemplateColumns: 'minmax(150px, 200px) 1fr',
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

