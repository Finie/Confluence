import { useState } from 'react'
import { Platform } from 'react-native'
import RNFS from 'react-native-fs'
import { launchImageLibrary } from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

const useImagePicker = () => {
  const [imageData, setImageData] = useState({ path: '', base64: '' })

  const handleImagePicker = async () => {
    return new Promise((resolve, reject) => {
      launchImageLibrary(
        { mediaType: 'photo', quality: 0.5, maxWidth: 600, maxHeight: 800 },
        async response => {
          if (response.didCancel) {
            console.log('User cancelled image picker')
            reject('User cancelled image picker')
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage)
            reject('ImagePicker Error: ' + response.errorMessage)
          } else {
            const imagePath = response.assets[0]

            if (Platform.OS === 'android') {
              try {
                const base64Data = await RNFetchBlob.fs.readFile(
                  imagePath.uri,
                  'base64',
                )

                resolve({
                  path: imagePath.uri,
                  base64: `data:image/png;base64,${base64Data}`,
                })
              } catch (error) {
                reject(error)
              }
            } else {
              try {
                const base64Data = await RNFS.readFile(imagePath.uri, 'base64')

                resolve({
                  path: imagePath.uri,
                  base64: `data:image/png;base64,${base64Data}`,
                })
              } catch (error) {
                reject(error)
              }
            }
          }
        },
      )
    })
  }

  const getPhoto = async () => {
    try {
      const imageData = await handleImagePicker()
      setImageData(imageData)
      return imageData
    } catch (error) {
      console.log('===============Error get image=====================')
      console.log(error)
      console.log('====================================')
      return null
    }
  }

  return {
    imageData,
    getPhoto,
  }
}

export default useImagePicker
