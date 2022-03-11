import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, Image, SafeAreaView, FlatList, StatusBar, Dimensions, View, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../components/Item';

//components
import LoadingIndicator from '../components/LoadingIndicator';
import Infos from '../components/Infos';
import TopBtns from '../components/TopBtns';


const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const STEPS = 10;
/* saving the recipes data in histroy screen with local starge ya hama */



export default function History({ navigation, route }) {
    const [recipes, setRecipes] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    // use effect read recipes from local storage
    useEffect(async () => {
        const getData = async () => {
            const results = await AsyncStorage.getItem('recipes')
            const resultJSON = await JSON.parse(results)
            return resultJSON
        }
        let res = await getData();
        //sort res by rating
        res.sort((a, b) => parseInt(b.rating) - parseInt(a.rating))
        setRecipes(res);
    }, [])

    const renderItem = ({ item }) => {
        const backgroundColor = item.name === selectedId ? "gray" : "transparent";
        const color = item.name === selectedId ? "transparent" : "black";
        return (
            <View>
                <TouchableOpacity onPress={() => {
                    setSelectedId(item.name);
                    navigation.navigate("RecipeDetail", { recipe: item });
                }} style={[styles.item, backgroundColor]}>
                    <Image style={styles.card} source={{ uri: item.images[0] }} />
                    <Infos recipe={item} />
                </TouchableOpacity>
            </View>
        );
    };

    if (!recipes) {
        return (
            <LoadingIndicator />
        )
    }

    return (
        <>
            {console.log("recipes", recipes.map(recipe => recipe.name))}
            <TopBtns navigation={navigation} route={route} path="History" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Saved Recipes</Text>
                <FlatList
                    data={recipes}
                    renderItem={(item) => renderItem(item)}
                    keyExtractor={(item) => item.name}
                    extraData={selectedId}
                    styles={styles.list}
                />
            </SafeAreaView>
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
    uploadedImg: {
        flex: 0.5,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        //center
        alignSelf: 'center',
    },
    title: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
    name: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
    holder: {
        flex: 0.5,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        //center
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        //center
        alignSelf: 'center',
        padding: 20,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        //center
        alignSelf: 'center',
        borderRadius: 60,
    },
    info: {
        fontSize: 20,
        fontWeight: 'bold',
        //left
        alignSelf: 'flex-start',
        marginTop: 5,
        color: '#fff',
        alignSelf: 'center',
    },
});
