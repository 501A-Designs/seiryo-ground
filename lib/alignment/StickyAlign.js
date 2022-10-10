import { styled } from "../../stitches.config";


export default function StickyAlign(props){
  const StickyAlign = styled('div', {
    display:'grid',
    gridTemplateColumns: 'minmax(150px, 200px) 1fr',
    gap:'0em'
  });

  return(
    <StickyAlign
      // responsiveDesign={{
      //   '@initial':'computer',
      //   '@bp1':'mobile',
      //   '@bp2':'tablet',
      //   '@bp3':'computer',
      // }}
    >
      {props.children}
    </StickyAlign>
  );
}

