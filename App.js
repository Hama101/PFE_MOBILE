import { StyleSheet, SafeAreaView, ImageBackground, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

//screens
import Home from './src/screens/home';
import ImageUploaded from './src/screens/imageUploaded';
import RecipesList from './src/screens/RecipesList';
import VedioList from './src/screens/VedioList';
import History from './src/screens/History';
import Help from './src/screens/Help';
//end screens


const bgImage = require('./assets/bg.jpg');
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

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
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ImageUploaded" component={ImageUploaded} />
          <Stack.Screen name="RecipesList" component={RecipesList} />
          <Stack.Screen name="VedioList" component={VedioList} options={{ orientation: 'all' }} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
      </NavigationContainer>
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