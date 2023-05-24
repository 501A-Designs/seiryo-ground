import { useRouter } from 'next/router'
import React from 'react'
import useSound from 'use-sound'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'

const SectionButtonStyled = styled('button',{
  cursor:'pointer',
  outlineColor:'$gray6', 
  display:'flex',
  alignItems:'center',
  gap:'$medium',
  width:'100%',
  borderRadius:'$r2',
  padding:'0.7em $medium',
  border:'1px solid $gray1',
  color:'$gray10',
  backgroundColor:'$gray1',

  // borderBottom: '1px solid transparent',
  // borderImage: 'linear-gradient(90deg, transparent 0%, $gray4 80%,transparent 100%)',
  // borderImageSlice: 1,
  '&:hover':{
    // backgroundColor:'$gray3',
    border:'1px solid $gray3',
    background:'linear-gradient(45deg, $gray3, $gray2)',
    color:'$gray12',
  },
  // 'svg':{
  //   width:'12px',
  //   height:'12px',
  // }
})

const SlugStyled = styled('div',{
  color:'$gray9',
  fontSize:'$6',
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
        <AlignItems gap={'0.7em'}>
          {props.icon}
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
