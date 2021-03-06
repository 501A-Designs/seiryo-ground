import React,{useState} from 'react'

export default function Input(props) {
  const [onFocus, setOnFocus] = useState(false)
  const input = {
    padding:'1em',
    borderRadius: '5px',
    outline: 'none',
    backgroundColor: `${onFocus ? 'white':'#f0f0f0'}`,
    border: `1px solid ${onFocus ? 'var(--sgGray)':'transparent'}`,
  }
  return (
    <input
      onFocus={()=>setOnFocus(true)}
      onBlur={()=>setOnFocus(false)}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={props.onChange}
      style={input}
      placeholder={props.placeholder}
    />
  )
}
