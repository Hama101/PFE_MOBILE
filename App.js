import { StyleSheet, SafeAreaView, ImageBackground, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Home from './src/screens/home';
import ImageUploaded from './src/screens/imageUploaded';
import VedioList from './src/screens/VedioList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

const bgImage = require('./assets/bg.jpg');
const Stack = createNativeStackNavigator()
enableScreens(true)
//default theme for the nav bar
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#010100'
  },
};



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{
            headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ImageUploaded" component={ImageUploaded} />
            <Stack.Screen name="VedioList" component={VedioList} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </SafeAreaView>
  );
}

//Create a background dark Color
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
})