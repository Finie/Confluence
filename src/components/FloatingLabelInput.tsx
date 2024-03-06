import React, { useRef, useState } from 'react'
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import Invisible from 'src/assets/icons/invisibleeye.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

interface Props {
  placeholder: string
  isPassword?: boolean
  customIcon?: any
  value?: string
  editable?: boolean
  onInputPress?: () => void
  onChangeText: (text: string) => void
  onBlur: () => void
  disabled?: boolean
}

const FloatingLabelInput: React.FC<Props> = ({
  placeholder,
  isPassword,
  onInputPress,
  editable = true,
  onBlur,
  value: eulav,
  onChangeText,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(eulav)
  const inputRef = useRef<TextInput>(null)
  const inputHeight = useRef(new Animated.Value(56)).current
  const labelPosition = useRef(new Animated.Value(18)).current
  const { colors } = useThemeStyles()
  const [tooglePassword, setTooglePassword] = useState(isPassword)

  const handleFocus = () => {
    setIsFocused(true)
    Animated.parallel([
      Animated.timing(inputHeight, {
        toValue: 64,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelPosition, {
        toValue: 40,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const handleBlur = () => {
    onBlur()
    setIsFocused(false)
    Animated.parallel([
      Animated.timing(inputHeight, {
        toValue: value ? 64 : 56,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelPosition, {
        toValue: value ? 40 : 18,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const handleTextChange = (text: string) => {
    setValue(text)
    onChangeText(text)
  }

  const handleIconPress = () => {
    setTooglePassword(!tooglePassword)
  }

  const handleInputPress = () => {
    if (onInputPress) {
      onInputPress()
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const styles = StyleSheet.create({
    inputContainer: {
      borderRadius: 8,
      borderWidth: 1,
      paddingTop: 8,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    floatingLabel: {
      position: 'absolute',
      left: 10,
      color: 'grey',
      fontSize: 14,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.black,
    },
    row: {
      width: '100%',
    },
  })

  return (
    <TouchableWithoutFeedback onPress={handleInputPress}>
      <View style={styles.row}>
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.inputContainer,
            borderColor: isFocused ? 'blue' : 'grey',
            height: inputHeight,
          }}>
          <Animated.Text
            style={{ ...styles.floatingLabel, bottom: labelPosition }}>
            {placeholder}
          </Animated.Text>
          <TextInput
            ref={inputRef}
            editable={editable}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...otherProps}
            value={value}
            onChangeText={handleTextChange}
            secureTextEntry={tooglePassword}
          />

          {isPassword && (
            //  eslint-disable-next-line react-native/no-inline-styles
            <TouchableOpacity onPress={handleIconPress} style={{ padding: 6 }}>
              <Invisible width={20} height={20} />
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default FloatingLabelInput
