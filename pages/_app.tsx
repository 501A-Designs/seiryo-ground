import { styled } from '../stitches.config'
import '../styles/globals.css'
import { useRouter } from 'next/router'

const GlobalStyling = styled('div',{
  '*': {
    fontFamily:'$sgFont1',
    'h1':{
      fontFamily:'$sgFont2',
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
  },
  background:'$gray1',
})


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <GlobalStyling>
    <Component {...pageProps}/>
  </GlobalStyling>
}

export default MyApp
