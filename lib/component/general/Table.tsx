import React from 'react'
import { styled } from '../../../stitches.config';
import { VariantProps } from '@stitches/react';

export interface TableProps extends 
VariantProps<typeof TableStyled>{
  caption?:string,
  column?:string,
  children:JSX.Element[]
}

const Table = (props:TableProps) => <TableStyled
  textAlign={props.textAlign}
>
  {props.caption && <caption>{props.caption}</caption>}
  {props.column &&  
    <colgroup>
      {props.column.split(' ').map((w:string)=>
        <col width={w}/>
      )}
    </colgroup>
  }
  <tbody>
    {props.children}
  </tbody>
</TableStyled>

const TableStyled = styled('table',{
  'caption':{
    textAlign:'right',
    fontSize:'$9',
    margin:'$small',
    color:'$gray10',
    textTransform: 'uppercase',
  },
  'th':{
    fontSize:'$8'
  },
  variants:{
    textAlign:{
      center:{
        textAlign:'center'
      },
      right:{
        textAlign:'right'
      },
      left:{
        textAlign:'left'
      }
    }
  },
  defaultVariants:{
    textAlign:'left'
  }
})

export default Table;