import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from '@motify/components'
import LoadingIndicator from '../components/LoadingIndicator';
import { uploadImage } from '../controllers/axios';
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';


export default function TopBtns({ navigation, route, path }) {
    console.log("navigation in TopBtns: ", navigation);
    console.log("route in TopBtns: ", route);
    console.log("path in TopBtns: ", path);
    const renderHelpIcon = () => {
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
        else {
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
    }
    return (
        <View style={styles.topBtns}>
            {renderHelpIcon()}
            <TouchableOpacity
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