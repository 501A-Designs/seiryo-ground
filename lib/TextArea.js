import React,{useState} from 'react'

export default function Input(props) {
  const [onFocus, setOnFocus] = useState(false)
  const textarea = {
    padding:'1em',
    border: '1px solid transparent',
    outline: 'none',
    resize: 'vertical',
    minHeight:'100px',
    borderRadius: '5px',
    backgroundColor: `${onFocus ? 'white':'#f0f0f0'}`,
    border: `1px solid ${onFocus ? 'var(--sgGray)':'transparent'}`,
  }
  return (
    <textarea
      onFocus={()=>setOnFocus(true)}
      onBlur={()=>setOnFocus(false)}
      type={props.type ? props.type : "text"}
      value={props.value}
      onChange={props.onChange}
      style={textarea}
      placeholder={props.placeholder}
    />
  )
}
