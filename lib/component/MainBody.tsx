import React from 'react'
import { styled } from '../../stitches.config'
import { popOut } from '../ux/keyframes'

const MainBodyStyled = styled('div',{
  fontFamily: '$sgFont1',
  userSelect: 'none',
  minHeight: '100vh',
  animation: `${popOut} 0.8s`,

  'a':{
    color: 'inherit',
    fontSize: 'inherit',
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
    cursor: 'pointer',
    '&:hover':{
      textDecorationStyle: 'none',
    }
  },
  'canvas':{
    borderRadius: '$r3',
    width: 'auto'
  },
  'iframe':{
    border: '1px solid $sgGray2',
    borderRadius: '$r2',
    // filter: 'grayscale(1)',
  },
  // '@mobile':{padding:'0% 5%'},
  // '@tablet':{padding:'0% 8%'},
  // '@desktop':{padding:'0% 15%'},
  'h1':{
    fontWeight: '500'
  },
  'h2':{
    fontWeight: '500',
  },
  'h3':{
    fontWeight: '500'
  },
  'h4':{
    fontWeight: '500'
  },
  'h5':{
    fontWeight: '500'
  },
  'h6':{
    fontWeight: '500'
  },
  'ul':{
    fontSize:'$8',
    margin:'$small 0'
  },
  'p':{
    fontSize:'$8'
  },
  'table':{  
    border: '1px solid $sgGray3',
    borderCollapse: 'collapse',
    textAlign: 'center',
    width: '100%'
  },
  'td':{
    border: '1px solid $sgGray3',
    padding: '$small',
  },
  'th':{
    border: '1px solid $sgGray3',
    backgroundColor: 'black',
    fontWeight: 'normal',
    color: 'white',
    padding: '$small',
  },
  'hr':{
    backgroundColor: '$sgGray3',
    border: '1px solid $sgGray3',
    width: '80%',
    borderRadius: '$round'
  },
})

export default function MainBody(props) {
  return (
    <MainBodyStyled>
      {props.children}
    </MainBodyStyled>
  )
}
