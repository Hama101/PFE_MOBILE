//React
import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, Image, SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import SwipeableViews from 'react-swipeable-views-native';
import { SocialIcon } from 'react-native-elements'
//my components
import TopBtns from '../components/TopBtns';
import ImagePreview from '../components/ImagePreview';
import Infos from '../components/Infos';
//controllers
import openLink from '../controllers/inAppBrowser';


export default function RecipeDetail({ navigation, route }) {
    const [recipe, setRecipe] = useState(route.params.recipe);

    const renderSocialIcons = () => {
        return (
            <View style={styles.list}>
                <SafeAreaView style={styles.socialIcons}>
                    <TouchableOpacity
                        onPress={() => {
                            openLink(`https://www.google.com/search?q=${recipe.name}+near+me`)
                        }}
                    >
                        <SocialIcon
                            raised={false}
                            type='google'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            openLink(`https://www.youtube.com/results?search_query=${recipe.name}+recipe`);
                        }}
                    >
                        <SocialIcon
                            raised={false}
                            type='youtube'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            openLink(`https://www.facebook.com/search/top?q=${recipe.name}+recipe`);
                        }}
                    >
                        <SocialIcon
                            raised={false}
                            type='facebook'
                        />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        )
    }

    const renderIngredients = () => {
        return (
            <View style={styles.list}>
                <Text style={styles.title}>Ingredients</Text>
                {recipe.ingredients.map((ingredient, index) => {
                    return <Text key={index} style={styles.leftName}>{ingredient}</Text>
                })}
            </View>
        )
    }

    const renderSteps = () => {
        return (
            <View style={styles.list}>
                <Text style={styles.title}>Steps</Text>
                {
                    recipe.instructions.map((instruction, index) => {
                        return <Text key={index} style={styles.leftName}>Step {index + 1} : {instruction}</Text>
                    })
                }
            </View>
        )
    }
    return (
        <>
            <TopBtns navigation={navigation} route={route} path="RecipeDetail" data={recipe} />
            <SafeAreaView style={styles.container}>
                <SafeAreaView style={styles.uploadedImgHoler}>
                    <ImagePreview source={recipe.images[0]} />
                    <Infos recipe={recipe} />
                    <ScrollView style={styles.left}>
                        {renderIngredients()}
                        {renderSteps()}
                        {renderSocialIcons()}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({
    // split the screen between uploadedImgHoler and holder
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
    },
    uploadedImgHoler: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
    },

    slide: {
        padding: 15,
        height: 100,
    },

    holder: {
        flex: 0.5,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        //center
        alignSelf: 'center',
    },
    left: {
        flex: 0.1,
        // aline this item to the left
        alignSelf: 'flex-start',
    },
    leftName: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
    list: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    socialIcons: {
        //algin this child elements on the same line
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});
