import React from 'react';
import { StyleSheet, View, TouchableOpacity, } from 'react-native';

import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TopBtns({ navigation, route, path, data }) {

    const handelSave = async () => {
        try {
            const recipes = await AsyncStorage.getItem('recipes');
            let savedRecipes;
            if (recipes) {
                savedRecipes = await JSON.parse(recipes);
            } else {
                savedRecipes = [];
            }
            //check if the recipe is already saved
            const isSaved = savedRecipes.find(recipe => recipe.name === data.name);
            console.log("cheking is saved :", isSaved);
            if (isSaved) {
                alert("This recipe is already saved");
            } else {
                savedRecipes.push(data);
                await AsyncStorage.setItem('recipes', JSON.stringify(savedRecipes));
                alert("Recipes saved successfully");
                navigation.navigate("History");
            }

        } catch (error) {
            // create item recipes
            await AsyncStorage.setItem('recipes', JSON.stringify([data]));
        }
    }
    const renderLeftIcon = () => {
        if (path === "Home") {
            return (<TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    left: -150,
                    top: 20,
                }}
                onPress={() => navigation.navigate('Help')}
            >
                <Entypo name="help" size={24} color="white" />
            </TouchableOpacity>)
        }
        if (path === "Home") {
            return (<TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    left: -150,
                    top: 20,
                }}
                onPress={() => navigation.navigate('Help')}
            >
                <Entypo name="help" size={24} color="white" />
            </TouchableOpacity>)
        }

        return (<TouchableOpacity
            style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
                borderRadius: 100,
                //allgin this item to the to right of the screen
                left: -150,
                top: 20,
            }}
            onPress={() => navigation.goBack()}
        >
            <AntDesign name="caretleft" size={24} color="white"
            />
        </TouchableOpacity >)
    }
    const renderRightIcon = () => {
        if (path === "VedioList") {
            return (<TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    right: -150,
                    top: 20,
                }}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: data })}
            >
                <AntDesign name="infocirlce" size={24} color="white" />
            </TouchableOpacity>)
        }
        if (path === "RecipeDetail") {
            return (<TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    right: -150,
                    top: 20,
                }}
                onPress={() => handelSave()}
            >
                <Entypo name="save" size={24} color="white" />
            </TouchableOpacity>)
        }
        return <TouchableOpacity
            style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
                borderRadius: 100,
                //allgin this item to the to right of the screen
                right: -150,
                top: 20,
            }}
            onPress={() => navigation.navigate('History')}
        >
            <FontAwesome name="history" size={24} color="white" />
        </TouchableOpacity>
    }
    return (
        <View style={styles.topBtns}>
            {renderLeftIcon()}
            {renderRightIcon()}
        </View>
    )
}

const styles = StyleSheet.create({
    topBtns: {
        //allgin this item to the top of the screen
        position: 'relative',
        top: 0,
        // allgin it child elements to the same line
        flexDirection: 'row',
        //allgin this item to the center of the screen
        alignSelf: 'center',
    },
});