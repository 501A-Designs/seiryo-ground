import { useRouter } from 'next/router'
import React from 'react'
import useSound from 'use-sound'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'

const SectionButtonStyled = styled('button',{
  outlineColor:'$gray6', 
  display:'flex',
  alignItems:'center',
  gap:'$medium',
  width:'100%',
  cursor:'pointer',
  borderRadius:'$r2',
  padding:'$medium',
  border:'none',
  color:'$gray11',
  backgroundColor:'white',

  borderTop: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, transparent 0%, $gray3 80%,transparent 100%)',
  borderImageSlice: 1,

  transition:'$speed1',
  '&:hover':{
    backgroundColor:'$gray2',
    transform:'translateX(2px)',
    color:'$gray12',
  },
})

const IconContainer = styled('div',{
  width:'20px',
  height:'20px',
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
})

const SlugStyled = styled('div',{
  color:'$gray10',
  fontSize:'$6',
  background:'linear-gradient(45deg, $gray1, $gray6)',
  border:'1px solid $gray6',
  padding:'$extraSmall $small',
  borderRadius:'$r1',
})

export default function SectionButton(props) {
  const router = useRouter();
  const [tap4] = useSound('/sound/tap-4-sg.mp3');
  const moveToPage = () =>{
    tap4()
    router.push(`/${props.slug ? props.slug:''}`);
  };
  
  return (
    <SectionButtonStyled
      onClick={()=>{
        props.onClick ? props.onClick:moveToPage();
      }}
    >
      <AlignItems spaceBetween>
        <AlignItems>
          <IconContainer>
            {props.icon}
          </IconContainer>
          <span>
            {props.children}
          </span>
        </AlignItems>
        {!props.onClick &&
          <SlugStyled>/{props.slug}</SlugStyled>
        }
      </AlignItems>
    </SectionButtonStyled>
  )
}
