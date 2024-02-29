import React, { useRef, useState } from 'react'
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

interface Props {
  placeholder: string
  isPassword?: boolean
  customIcon?: any
  value?: string
  onInputPress?: () => void
  onChangeText: (text: string) => void
  onBlur: () => void
}

const FloatingTextArea: React.FC<Props> = ({
  placeholder,
  isPassword,
  customIcon,
  onInputPress,
  onBlur,
  value: eulav,
  onChangeText,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState(eulav)
  const inputRef = useRef<TextInput>(null)
  const inputHeight = useRef(new Animated.Value(88)).current
  const labelPosition = useRef(new Animated.Value(50)).current
  const { colors } = useThemeStyles()

  const handleFocus = () => {
    setIsFocused(true)
    Animated.parallel([
      Animated.timing(inputHeight, {
        toValue: 120,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelPosition, {
        toValue: 95,
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
        toValue: value ? 120 : 88,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelPosition, {
        toValue: value ? 95 : 50,
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
    if (inputRef.current) {
      inputRef.current.focus()
    }
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
      // flexDirection: 'row',
      // alignItems: 'center',
    },
    floatingLabel: {
      position: 'absolute',
      left: 10,
      color: 'grey',
      fontSize: 14,
    },
    input: {
      // flex: 1,
      marginLeft: 8,
      fontSize: 16,
      // backgroundColor: 'red',
      textAlignVertical: 'top',
      marginTop: 16,
      color: colors.black,
    },
  })

  return (
    <TouchableWithoutFeedback onPress={handleInputPress} accessible={false}>
      <>
        <Animated.View
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
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={handleTextChange}
            {...otherProps}
            numberOfLines={4}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            multiline={true}
            returnKeyType={'done'}
            secureTextEntry={isPassword}
          />
        </Animated.View>
        <TouchableOpacity onPress={handleIconPress}>
          {isPassword && <Text>{customIcon ? customIcon : '👁'}</Text>}
        </TouchableOpacity>
      </>
    </TouchableWithoutFeedback>
  )
}

export default FloatingTextArea
