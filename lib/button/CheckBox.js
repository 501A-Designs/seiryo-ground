import React from 'react'
import { FiCheckSquare, FiSquare } from 'react-icons/fi'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'

const CheckBoxStyled = styled('div',{
  cursor: 'pointer',
  backgroundColor: 'black',
  borderRadius: '$r2',
  padding: '$small',
  minWidth: '200px',
  border: '1px solid transparent',
  transition: '$speed1',
  variants:{
    checked: {
      true: {
        backgroundColor: 'black',
        color: 'white',
      },
      false: {
        backgroundColor: 'white',
        color: 'black',
        '&:hover': {
          backgroundColor: '$sgGray2',
          border: '1px solid $sgGray3',
          transform: 'scale(1.04)'
        }
      }
    }
  }
})
export default function CheckBox(props) {
  return (
    <CheckBoxStyled
      checked={props.checked}
      onClick={props.onClick}
      key={props.key}
    >
      <AlignItems>
        {props.checked ? <FiCheckSquare/>:<FiSquare/>}
        {props.name == "free" && '無料'}
        {props.name == "cash" && '現金'}
        {props.name == "credit" && 'クレジットカード'}
        {props.name == "digitalMoney" && '電子マネー'}
      </AlignItems>
    </CheckBoxStyled>
  )
}
