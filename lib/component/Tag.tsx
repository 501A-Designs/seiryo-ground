import React from 'react'
import { styled } from '../../stitches.config'

export default function Tag({
  title,
  children
}:{
  title?:string,
  children:JSX.Element | JSX.Element[]
}) {
  return <TagStyled>
    {title && <h6>{title}</h6>}
    {children}
  </TagStyled>
}

const TagItem = ({
  icon,
  name
}:{
  icon?:JSX.Element,
  name:string,
}) => (
  <TagItemStyled>
    {icon}
    <span>
      {name}
    </span>
  </TagItemStyled>
)

const TagStyled = styled('section',{
  display:'flex',
  gap:'0.25em',
  alignItems:'center',
  flexWrap:'wrap',
  'h6':{
    margin:'0 $small 0 0'
  }
})

const TagItemStyled = styled('div',{
  borderRadius:'$round',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  gap:'$small',
  padding:'$extraSmall $medium',
  border:'1px solid $gray4',
  background:'linear-gradient(20deg, $gray3 0%,$gray1 100%)',
  'span':{
    color:'$gray11',
    fontSize:'$9',
  },
  'svg':{
    width:'12px',
    height:'12px'
  }
});

Tag.Item = TagItem;