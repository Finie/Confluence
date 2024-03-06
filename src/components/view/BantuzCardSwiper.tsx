/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable import/order */

/* eslint-disable semi */
import React, { useContext, useRef, useState } from 'react'
import {
  Animated,
  ImageBackground,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Image from 'react-native-fast-image'
import { clamp } from 'rn-range-slider/helpers'
import { convertDistance, isEmpty } from 'src/helper'
import utils from 'src/utils'

import Hearts from 'src/assets/icons/buttonheart.svg'
import CloseIcon from 'src/assets/icons/closeicon.svg'
import Dots from 'src/assets/icons/dotsmenu.svg'
import Rewind from 'src/assets/icons/rewind.svg'
import Smiles from 'src/assets/icons/smilebutton.svg'
import FinalCard from 'src/assets/images/finalcard.png'
import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { BantuProfile, SwipeActions } from 'src/utils/shared-type'

const SWIPE_THRESHOLD = 120
// const { height } = Dimensions.get('window')

type Props = {
  bantuzUser: BantuProfile[]
  onUpdatebantuUser: (
    type: 'Add' | 'Remove',
    profile: BantuProfile | null,
  ) => void
  onSwipeRight: (currentUser: BantuProfile) => void
  onSwipeLeft: (currentUser: BantuProfile) => void
  onOpenMoredetails: (currentUser: BantuProfile) => void
}

const BantuzCardSwiper: React.FC<Props> = ({
  bantuzUser,
  onUpdatebantuUser,
  onSwipeRight,
  onSwipeLeft,
  onOpenMoredetails,
}) => {
  const { colors } = useThemeStyles()
  const [actionType, setActionType] = useState<SwipeActions>()

  let swipeState: 'RIGHT' | 'LEFT' = 'RIGHT'

  // @ts-ignore
  let currentProfile: BantuProfile = {}
  const [transversedUser, setTransversedUser] = useState<BantuProfile[]>([])
  const { isInKilometers } = useContext(BaseContextProvider)
  const _animation_drag_top = useRef(new Animated.ValueXY()).current
  const _animation_fade_out_top_card = useRef(new Animated.Value(1)).current
  const _scale_card_behind = useRef(new Animated.Value(0.93)).current

  const _rotate_card_interpolation = _animation_drag_top.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-45deg', '0deg', '45deg'],
    extrapolate: 'clamp', // so that you dont over shoot the values stated
  })

  const opacity = _animation_drag_top.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp', // so that you dont over shoot the values stated
  })

  const isDraggable = (gestureState: PanResponderGestureState): boolean => {
    if (gestureState.dx > 0 || gestureState.dx < 0) {
      return true
    }
    return false
  }

  const AnimatedImageBackground =
    Animated.createAnimatedComponent(ImageBackground)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_evt, _gestureState) => true,
    onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: _animation_drag_top.x,
          dy: _animation_drag_top.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),

    onPanResponderRelease: (_e, { dx, vx, vy }) => {
      //handle what happens when the card has been released
      let velocity

      if (dx >= 0) {
        // swiping to the right
        swipeState = 'RIGHT'
        velocity = clamp(vx, 3, 5)
      } else {
        // swiping to the left
        swipeState = 'LEFT'
        velocity = clamp(Math.abs(vx), 3, 5) * -1
      }

      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        // make a desision is the threashold is exceded
        Animated.decay(_animation_drag_top, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.98,
          useNativeDriver: false,
        }).start(() => {
          undoSwipeTransitionAnimation()
        })

        if (swipeState === 'RIGHT') {
          onSwipeRight(currentProfile)
        }

        if (swipeState === 'LEFT') {
          onSwipeLeft(currentProfile)
        }
      } else {
        // reset to default position if threashold is not exceded
        Animated.spring(_animation_drag_top, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start()
      }
    },
  })

  const _animated_card_styles = {
    opacity: _animation_fade_out_top_card,
    transform: [
      {
        rotate: _rotate_card_interpolation, // rotate transform the card
      },
      {
        translateX: _animation_drag_top.x, // move the card in the x-axis
      },
    ],
  }

  const _animated_background_image = {
    opacity,
  }

  const undoSwipeTransitionAnimation = () => {
    Animated.parallel([
      Animated.timing(_animation_fade_out_top_card, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(_scale_card_behind, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => updateUserDataValue())
  }

  const updateUserDataValue = () => {
    setTransversedUser(transversedUser => [bantuzUser[0], ...transversedUser]) // add the swiped user to a location to allow undo
    // transversedUser?.unshift(data[0]) // add the swiped user to a location to allow undo

    onUpdatebantuUser('Remove', null) // remove the swiped user and update data
    // reset all values to initial states
    _scale_card_behind.setValue(0.93)
    _animation_fade_out_top_card.setValue(1)
    _animation_drag_top.setValue({ x: 0, y: 0 })
  }

  const handleLike = () => {
    setActionType('LIKE')
    Animated.timing(_animation_drag_top.x, {
      toValue: SWIPE_THRESHOLD,
      duration: 250,
      useNativeDriver: false,
    }).start(updateUserDataValue)
    onSwipeRight(currentProfile)
  }

  const handleSuperLike = () => {
    setActionType('SUPERLIKE')
    Animated.timing(_animation_drag_top.x, {
      toValue: SWIPE_THRESHOLD,
      duration: 250,
      useNativeDriver: false,
    }).start(updateUserDataValue)
    onSwipeRight(currentProfile)
  }

  const handlePass = () => {
    setActionType('PASS')
    Animated.timing(_animation_drag_top.x, {
      toValue: -SWIPE_THRESHOLD,
      duration: 250,
      useNativeDriver: false,
    }).start(updateUserDataValue)
    onSwipeLeft(currentProfile)
  }

  const handleUndoSwipe = () => {
    //handle undo and re-add it to original stack
    if (!isEmpty(transversedUser)) {
      // set previous item to the top most item in transversedUser
      onUpdatebantuUser('Add', transversedUser[0]) //add previous item to top of data stack
      setTransversedUser(transversedUser => transversedUser.slice(1)) // update transversed data after removing the first element
    }
  }

  const styles = StyleSheet.create({
    inner_container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 500,
      width: 400,
    },
    card_container: {
      height: 480,
      width: 350,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor:
        actionType === 'LIKE'
          ? colors.secondary
          : actionType === 'PASS'
          ? colors.black
          : colors.primary,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      position: 'absolute',
    },
    image_background: {
      flex: 1,
      padding: 16,
    },
    distance_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 24,
    },
    distance_text: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '400',
      color: colors.white,
    },
    name_container: {},
    username_text: {
      fontSize: 32,
      lineHeight: 39,
      color: colors.white,
      fontWeight: '700',
    },
    age_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    age_text: {
      fontSize: 24,
      lineHeight: 29,
      fontWeight: '400',
      color: colors.white,
    },
    more_icon_container: {
      padding: 8,
    },
    buttons: {
      height: 60,
      width: '70%',
      marginHorizontal: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
      marginTop: -24,
    },
    smileButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartsbutton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancel: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.black_to_primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rewind: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.silver,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipes_container: {
      borderRadius: 30,
      overflow: 'hidden',
      height: 380,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingStart: 60,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer_texts: {
      fontSize: 14,
      marginTop: 4,
      fontWeight: '700',
      color: colors.silver,
    },
    lastcontainer: {
      width: 350,
      // flex: 1,
      borderRadius: 32,
      height: 480,
    },
    no_cards_container: {
      height: 500,
      justifyContent: 'center',
      alignItems: 'center',
      width: 400,
    },
    imageOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
  })

  const RenderNoMoreCard = () => (
    <ImageBackground
      source={require('src/assets/illustrations/swiper_backgroud.png')}
      style={styles.no_cards_container}>
      <Image source={FinalCard} style={styles.lastcontainer} />
    </ImageBackground>
  )

  return (
    <>
      <ImageBackground
        source={
          isEmpty(bantuzUser)
            ? null
            : require('src/assets/illustrations/swiper_backgroud.png')
        }
        style={styles.inner_container}>
        {isEmpty(bantuzUser) ? (
          <RenderNoMoreCard />
        ) : (
          bantuzUser
            .slice(0, 2)
            .reverse()
            .map((item, index, items) => {
              const _isLastCard = index === items.length - 1
              const _isSecondLastCard = index === items.length - 2

              const card_style_animated = _isLastCard
                ? _animated_card_styles
                : {}

              const background_image_animated = _isLastCard
                ? _animated_background_image
                : {}

              const second_last_style = _isSecondLastCard
                ? {
                    transform: [
                      {
                        scale: _scale_card_behind,
                      },
                    ],
                  }
                : {}

              if (_isLastCard) {
                currentProfile = item // set the current profile as the top most
              }
              const _panHandlers = _isLastCard ? panResponder.panHandlers : {}

              return (
                <Animated.View
                  style={[
                    styles.card_container,
                    card_style_animated,
                    second_last_style,
                  ]}
                  key={index}
                  {..._panHandlers}>
                  <AnimatedImageBackground
                    resizeMode={'cover'}
                    source={
                      item?.thumbnail
                        ? {
                            uri: `${item.thumbnail}`,
                          }
                        : require('src/assets/images/love_illustaration.png')
                    }
                    style={[
                      styles.image_background,
                      background_image_animated,
                    ]}>
                    <Text style={styles.distance_text}>{`${convertDistance(
                      +item.distance,
                      isInKilometers ? 'miToKm' : 'kmToMi',
                    )} ${isInKilometers ? 'Km' : 'miles'} away`}</Text>

                    <View style={styles.distance_container}>
                      {_isLastCard && (
                        <Animated.View
                          style={
                            // actionType === 'LIKE'
                            //   ? styles.heartsbutton
                            //   : actionType === 'PASS'
                            //   ? styles.cancel
                            //   : actionType === 'SUPERLIKE'
                            //   ? styles.smileButton
                            //                           :
                            {}
                          }>
                          {/* {actionType === 'LIKE' ? (
                            <Hearts />
                          ) : actionType === 'SUPERLIKE' ? (
                            <Smiles />
                          ) : actionType === 'PASS' ? (
                            <CloseIcon />
                          ) : null} */}
                        </Animated.View>
                      )}
                    </View>

                    <View>
                      <Text type={'heading'} style={styles.username_text}>
                        {`${item.first_name} ${item.last_name}`}
                      </Text>
                      <View style={styles.age_container}>
                        <Text style={styles.age_text}>{item.age}</Text>
                        <TouchableOpacity
                          onPressOut={() => onOpenMoredetails(currentProfile)}
                          style={styles.more_icon_container}>
                          <Dots />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </AnimatedImageBackground>
                  {/* thumbnail image */}
                  <AnimatedImageBackground //original image
                    resizeMode={'cover'}
                    source={{
                      uri: item?.default_image
                        ? `${item.default_image}`
                        : `${utils.placeholderImage}`,
                    }}
                    style={[
                      styles.image_background,
                      background_image_animated,
                      styles.imageOverlay,
                    ]}>
                    <Text style={styles.distance_text}>{`${convertDistance(
                      +item.distance,
                      isInKilometers ? 'miToKm' : 'kmToMi',
                    )} ${isInKilometers ? 'Km' : 'miles'} away`}</Text>

                    <View style={styles.distance_container}>
                      {_isLastCard && (
                        <Animated.View
                          style={
                            // actionType === 'LIKE'
                            //   ? styles.heartsbutton
                            //   : actionType === 'PASS'
                            //   ? styles.cancel
                            //   : actionType === 'SUPERLIKE'
                            //   ? styles.smileButton
                            //                           :
                            {}
                          }>
                          {/* {actionType === 'LIKE' ? (
                            <Hearts />
                          ) : actionType === 'SUPERLIKE' ? (
                            <Smiles />
                          ) : actionType === 'PASS' ? (
                            <CloseIcon />
                          ) : null} */}
                        </Animated.View>
                      )}
                    </View>

                    <View>
                      <Text type={'heading'} style={styles.username_text}>
                        {`${item.first_name} ${item.last_name}`}
                      </Text>
                      <View style={styles.age_container}>
                        <Text style={styles.age_text}>{item.age}</Text>
                        <TouchableOpacity
                          onPressOut={() => onOpenMoredetails(currentProfile)}
                          style={styles.more_icon_container}>
                          <Dots />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </AnimatedImageBackground>
                </Animated.View>
              )
            })
        )}
      </ImageBackground>
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isEmpty(transversedUser)}
            style={styles.rewind}
            onPress={handleUndoSwipe}>
            <Rewind />
          </TouchableOpacity>
          <Text style={styles.buttonContainer_texts}>Rewind</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isEmpty(bantuzUser)}
            style={styles.cancel}
            onPress={handlePass}>
            <CloseIcon />
          </TouchableOpacity>
          <Text style={styles.buttonContainer_texts}>Pass</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isEmpty(bantuzUser)}
            style={styles.heartsbutton}
            onPress={handleLike}>
            <Hearts />
          </TouchableOpacity>
          <Text style={styles.buttonContainer_texts}>Like</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isEmpty(bantuzUser)}
            style={styles.smileButton}
            onPress={handleSuperLike}>
            <Smiles />
          </TouchableOpacity>
          <Text style={styles.buttonContainer_texts}>Super Like</Text>
        </View>
      </View>
    </>
  )
}

export default BantuzCardSwiper
