import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import SwipeCards from 'src/components/view/lib/swipes-component'
import { BantuProfile } from 'src/utils/shared-type'

import CardItem from './CardItem'
import NoMoreCards from './NoMoreCards'

type Props = {
  data: BantuProfile[]
}

const SwipableCards: React.FC<Props> = ({ data }) => {
  const [remainingCards, setRemainingCards] = useState<BantuProfile[]>(data)

  console.log('===========SwipableCards=========================')
  console.log(remainingCards)
  console.log('====================================')

  const handleYup = (card: BantuProfile) => {
    console.log('Yup', card)
  }

  const handleNope = (card: BantuProfile) => {
    console.log('Nope', card)
  }

  const renderCardItem = (cardData: BantuProfile) => (
    <CardItem user={cardData} />
  )

  const renderNoMoreCards = () => <NoMoreCards />

  return (
    <SwipeCards
      cards={data}
      renderCard={renderCardItem}
      renderNoMoreCards={renderNoMoreCards}
      handleYup={handleYup}
      handleNope={handleNope}
      cardRemoved={() => setRemainingCards(remainingCards.slice(1))}
      smoothTransition
      stack={false}
      stackDepth={2}
      disableBottomSwipe
      disableLeftSwipe
      disableRightSwipe
      showYup
      showNope
      yupText="LIKE"
      nopeText="PASS"
      yupStyle={{ borderColor: 'green', borderWidth: 1 }}
      nopeStyle={{ borderColor: 'red', borderWidth: 1 }}
      yupTextStyle={{ color: 'green' }}
      nopeTextStyle={{ color: 'red' }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SwipableCards
