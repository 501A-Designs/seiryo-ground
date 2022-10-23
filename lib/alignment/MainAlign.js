import { styled } from "../../stitches.config";

const MainAlignStyled = styled('div', {
  display:'grid',
  minHeight:'100vh',
  '@mobile':{
    gridTemplateColumns: '1fr',
    gap:'0em',
  },
  '@tablet':{
    // gridTemplateColumns: 'minmax(50px, 130px) 1fr',
    display: 'flex',
    justifyContent: 'space-between',
    // gap:'$medium',
    gap:'$small', 
  },
  '@desktop':{
    // gridTemplateColumns: 'minmax(150px, 200px) 1fr',
    display: 'flex',
    justifyContent: 'space-between',
    gap:'$small',
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

