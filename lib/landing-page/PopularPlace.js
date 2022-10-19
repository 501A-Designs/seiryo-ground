import { doc } from 'firebase/firestore'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { styled } from '../../stitches.config'
import AlignItems from '../alignment/AlignItems'
import Grid from '../alignment/Grid'
import Rating from '../Rating'
import TypeBadge from '../TypeBadge'

const PopularPlaceStyled = styled('div', {
  padding:'$medium $medium $medium $medium',
  borderRadius:'$r4',
  // backgroundColor:'$sgGray1',
  border: '1px solid $sgGray2',
  boxShadow: '$shadow1',
  'h1':{
    margin:'0'
  },
  'span':{
    padding: '0 $small',
    color:'red'
  }
})

export default function PopularPlace(props) {
  const [placeData] = useDocument(doc(db,`places/${props.placeId}/`))
  return (
    <PopularPlaceStyled>
      {placeData &&      
        <Grid gap={'large'}>
          <AlignItems gap={'0.5em'} justifyContent={'space-between'} margin='1em'>
            <Grid gap={'small'}>
              <h1>{placeData.data().name}</h1>
              <TypeBadge
                type={placeData.data().type}
                width='long'
              />
            </Grid>
          </AlignItems>
          <Grid grid={'quad'} gap={'extraSmall'}>
            <Rating
              borderRadius={'left'}
              rating={'10'}
              description={'最寄駅からのアクセス'}
            />
            <Rating
              rating={'5'}
              description={'最寄駅からのアクセス'}
            />
            <Rating
              rating={'8'}
              description={'最寄駅からのアクセス'}
            />
            <Rating
              borderRadius={'right'}
              rating={placeData.data().likes.length}
              description={'いいね数'}
            />
          </Grid>
        </Grid>
      }
    </PopularPlaceStyled>
  )
}
