import React,{useState} from 'react'

export default function Input(props) {
  const [onFocus, setOnFocus] = useState(false)
  const input = {
    padding:'1em',
    border: '1px solid transparent',
    outline: 'none',
    backgroundColor: `${onFocus ? 'white':'#f0f0f0'}`,
    borderBottom: `1px solid ${onFocus ? 'black':'var(--sgGray)'}`,
  }
  return (
    <input
      onFocus={()=>setOnFocus(true)}
      onBlur={()=>setOnFocus(false)}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={props.onChange}
      style={input}
      placeHolder={props.placeHolder}
    />
  )
}
