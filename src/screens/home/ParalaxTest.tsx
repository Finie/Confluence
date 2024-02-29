// import React, { useEffect, useRef } from 'react';
// import {
//   Animated,
//   Dimensions,
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {
//   Body,
//   Header,
//   List,
//   ListItem as Item,
//   ScrollableTab,
//   Tab,
//   TabHeading,
//   Tabs,
//   Title,
// } from 'native-base';
// import LinearGradient from 'react-native-linear-gradient';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const IMAGE_HEIGHT = 250;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 50;
// const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
// const THEME_COLOR = 'rgba(85,186,255, 1)';
// const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)';

// const ParalaxTest: React.FC = () => {
//   const nScroll = useRef(new Animated.Value(0)).current;
//   const scroll = useRef(new Animated.Value(0)).current;
//   const textColor = scroll.interpolate({
//     inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
//     outputRange: [THEME_COLOR, FADED_THEME_COLOR, 'white'],
//     extrapolate: 'clamp',
//   });
//   const tabBg = scroll.interpolate({
//     inputRange: [0, SCROLL_HEIGHT],
//     outputRange: ['white', THEME_COLOR],
//     extrapolate: 'clamp',
//   });
//   const tabY = nScroll.interpolate({
//     inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
//     outputRange: [0, 0, 1],
//   });
//   const headerBg = scroll.interpolate({
//     inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
//     outputRange: ['transparent', 'transparent', THEME_COLOR],
//     extrapolate: 'clamp',
//   });
//   const imgScale = nScroll.interpolate({
//     inputRange: [-25, 0],
//     outputRange: [1.1, 1],
//     extrapolateRight: 'clamp',
//   });
//   const imgOpacity = nScroll.interpolate({
//     inputRange: [0, SCROLL_HEIGHT],
//     outputRange: [1, 0],
//   });
//   const heights = [500, 500];
//   const [activeTab, setActiveTab] = React.useState(0);
//   const [height, setHeight] = React.useState(500);

//   useEffect(() => {
//     nScroll.addListener(
//       Animated.event([{ value: scroll }], { useNativeDriver: false })
//     );
//     return () => {
//       nScroll.removeAllListeners();
//     };
//   }, [nScroll]);

//   const tabContent = (x: number, i: number) => (
//     <View style={{ height }}>
//       <List
//         onLayout={({ nativeEvent: { layout: { height: tabHeight } } } }) => {
//           heights[i] = tabHeight;
//           if (activeTab === i) setHeight(tabHeight);
//         }}
//       >
//         {Array.from({ length: x }).map((_, i) => (
//           <Item key={i}>
//             <Text>Item {i}</Text>
//           </Item>
//         ))}
//       </List>
//     </View>
//   );

//   return (
//     <View>
//       <Animated.View
//         style={{
//           position: 'absolute',
//           width: '100%',
//           backgroundColor: headerBg,
//           zIndex: 1,
//         }}
//       >
//         <Header style={{ backgroundColor: 'transparent' }} hasTabs>
//           <Body>
//             <Title>
//               <Animated.Text
//                 style={{ color: textColor, fontWeight: 'bold' }}
//               >
//                 Tab Parallax
//               </Animated.Text>
//             </Title>
//           </Body>
//         </Header>
//       </Animated.View>
//       <Animated.ScrollView
//         scrollEventThrottle={5}
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: nScroll } } }],
//           { useNativeDriver: true }
//         )}
//         style={{ zIndex: 0 }}
//       >
//         <Animated.View
//           style={{
//             transform: [
//               { translateY: Animated.multiply(nScroll, 0.65) },
//               { scale: imgScale },
//             ],
//             backgroundColor: THEME_COLOR,
//           }}
//         >
//           <Animated.Image
//             source={{
//               uri:
//                 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Moraine_Lake_17092005.jpg',
//             }}
//             style={{
//               height: IMAGE_HEIGHT,
//               width: '100%',
//               opacity: imgOpacity,
//             }}
//           >
//             {/* gradient */}
//             <LinearGradient
//               colors={[
//                 'rgba(255,255,255,0.9)',
//                 'rgba(255,255,255,0.35)',
//                 'rgba(255,255,255,0)',
//               ]}
//               locations={[0, 0.25, 1]}
//               style={{ position: 'absolute', height: '100%', width: '100%' }}
//             />
//           </Animated.Image>
//         </Animated.View>
//         <Tabs
//           prerenderingSiblingsNumber={3}
//           onChangeTab={({ i }) => {
//             setHeight(heights[i]);
//             setActiveTab(i);
//           }}
//           renderTabBar={(props) => (
//             <Animated.View
//               style={{
//                 transform: [{ translateY: tabY }],
//                 zIndex: 1,
//                 width: '100%',
//                 backgroundColor: 'white',
//               }}
//             >
//               <ScrollableTab
//                 {...props}
//                 renderTab={(name, page, active, onPress, onLayout) => (
//                   <TouchableOpacity
//                     key={page}
//                     onPress={() => onPress(page)}
//                     onLayout={onLayout}
//                     activeOpacity={0.4}
//                   >
//                     <Animated.View
//                       style={{
//                         flex: 1,
//                         height: 100,
//                         backgroundColor: tabBg,
//                       }}
//                     >
//                       <TabHeading
//                         scrollable
//                         style={{
//                           backgroundColor: 'transparent',
//                           width: SCREEN_WIDTH / 2,
//                         }}
//                         active={active}
//                       >
//                         <Animated.Text
//                           style={{
//                             fontWeight: active ? 'bold' : 'normal',
//                             color: textColor,
//                             fontSize: 14,
//                           }}
//                         >
//                           {name}
//                         </Animated.Text>
//                       </TabHeading>
//                     </Animated.View>
//                   </TouchableOpacity>
//                 )}
//                 underlineStyle={{ backgroundColor: textColor }}
//               />
//             </Animated.View>
//           )}
//         >
//           <Tab heading="Tab 1">{tabContent(30, 0)}</Tab>
//           <Tab heading="Tab 2">{tabContent(15, 1)}</Tab>
//         </Tabs>
//       </Animated.ScrollView>
//     </View>
//   );
// };

// export default ParalaxTest;
