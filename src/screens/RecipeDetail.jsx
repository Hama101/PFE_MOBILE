import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import TopBtns from '../components/TopBtns';
import { Entypo } from '@expo/vector-icons';


export default function RecipeDetail({ navigation, route }) {
    const [recipe, setRecipe] = useState(route.params.recipe);

    return (
        <>
            <TopBtns navigation={navigation} route={route} path="RecipeDetail" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>{recipe.name}</Text>
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
    },//center this element whith white color and bold font
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
});
