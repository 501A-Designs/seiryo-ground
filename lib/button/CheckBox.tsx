import React from 'react'
import { FiCheckSquare, FiSquare } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'

const CheckBoxStyled = styled('div',{
  cursor: 'pointer',
  userSelect:'none',
  backgroundColor: 'black',
  borderRadius: '$r2',
  padding: '$small',
  minWidth: '200px',
  border: '1px solid transparent',
  transition: '$speed1',
  variants:{
    checked: {
      true: {
        backgroundColor: '$gray12',
        color: '$gray1',
      },
      false: {
        backgroundColor: 'transparent',
        color: '$gray10',
        '&:hover': {
          backgroundColor:'$gray4',
          border:'1px solid $gray5',
          color: '$gray11',
        }
      }
    }
  },
  'h5':{
    margin:0
  }
})
export default function CheckBox(props) {
  return (
    <CheckBoxStyled
      checked={props.checked}
      onClick={props.onClick}
    >
      <AlignItems>
        {props.checked ? <FiCheckSquare/>:<FiSquare/>}
        <h5>
          {props.name == "free" && '無料'}
          {props.name == "cash" && '現金'}
          {props.name == "credit" && 'クレジットカード'}
          {props.name == "digitalMoney" && '電子マネー'}
        </h5>
      </AlignItems>
    </CheckBoxStyled>
  )
}
