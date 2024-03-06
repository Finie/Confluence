import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import BackButton from 'src/assets/icons/arrow_back_paralax.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { CarouselItemParalax } from 'src/utils/shared-type'

import Text from '../Text'

interface ImageSliderProps {
  images: CarouselItemParalax[]
  interval: number
  onBackPress: () => void
  isBackVisible?: boolean
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)
const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval,
  onBackPress,
  isBackVisible = true,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const { colors } = useThemeStyles()
  useEffect(() => {
    const animateImageFade = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start()
      })
    }
    const imageSliderInterval = setInterval(() => {
      animateImageFade()
    }, interval)

    return () => clearInterval(imageSliderInterval)
  }, [currentImageIndex, fadeAnim, images.length, interval])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    touchable_opacity: {
      padding: 30,
    },
    lottie_file: {
      height: '100%',
      width: '100%',
    },
    lottie_container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      {true ? (
        <AnimatedImageBackground
          source={{
            uri:
              images && images.length > 0
                ? images[currentImageIndex].path
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          style={[styles.image, { opacity: fadeAnim }]}>
          {isBackVisible && (
            <TouchableOpacity
              style={styles.touchable_opacity}
              onPress={onBackPress}>
              <BackButton />
            </TouchableOpacity>
          )}
        </AnimatedImageBackground>
      ) : (
        <View style={styles.lottie_container}>
          <AnimatedLottieView
            source={require('src/assets/animations/image_loader.json')}
            style={styles.lottie_file}
            autoPlay={true}
            loop={true}
          />
          <Text style={{ zIndex: 10 }}>Loading ...</Text>
        </View>
      )}
    </View>
  )
}

export default ImageSlider
