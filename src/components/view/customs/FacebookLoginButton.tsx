// import React from 'react'
// import { View } from 'react-native'
// import { AccessToken, LoginButton } from 'react-native-fbsdk'
// interface Props {}
// interface State {}
// class FacebookLoginButton extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//   }
//   onFacebookButtonPress = () => {
//     LoginManager.logInWithPermissions(['public_profile', 'email']).then(
//       result => {
//         if (result.isCancelled) {
//           console.log('Login cancelled')
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             console.log(data.accessToken.toString())
//           })
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error)
//       },
//     )
//   }
//   render() {
//     return (
//       <View>
//         <LoginButton
//           onLoginFinished={(error, result) => {
//             if (error) {
//               console.log('Login failed with error: ' + error.message)
//             } else if (result.isCancelled) {
//               console.log('Login was cancelled')
//             } else {
//               AccessToken.getCurrentAccessToken().then(data => {
//                 console.log(data.accessToken.toString())
//               })
//             }
//           }}
//           onLogoutFinished={() => console.log('User logged out')}
//           permissions={['public_profile', 'email']}
//         />
//       </View>
//     )
//   }
// }
// export default FacebookLoginButton
import React from 'react'
import { Text, View } from 'react-native'

const FacebookLoginButton = () => {
  return (
    <View>
      <Text>FacebookLoginButton</Text>
    </View>
  )
}

export default FacebookLoginButton
