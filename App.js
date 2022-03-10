import { StyleSheet, SafeAreaView, ImageBackground, Text, View, Easing } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';

//screens
import Home from './src/screens/Home';
import ImageUploaded from './src/screens/ImageUploaded';
import RecipesList from './src/screens/RecipesList';
import VedioList from './src/screens/VedioList';
import History from './src/screens/History';
import Help from './src/screens/Help';
import RecipeDetail from './src/screens/RecipeDetail';
//end screens



const Stack = createStackNavigator();
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
//config for the screen transcations animations
//customTransition to create an animations while changing between screens
const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next ?
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          }
        ]
      },
      opacity: current.opacity,
    }
  }
}
const screenOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  headerMode: 'none',
}
const options = {
  ...customTransition,
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} options={options} />
          <Stack.Screen name="ImageUploaded" component={ImageUploaded} options={options} />
          <Stack.Screen name="RecipesList" component={RecipesList} options={options} />
          <Stack.Screen name="VedioList" component={VedioList} options={options} />
          <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={options} />
          <Stack.Screen name="History" component={History} options={options} />
          <Stack.Screen name="Help" component={Help} options={options} />
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