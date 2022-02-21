import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from '@motify/components'
import LoadingIndicator from '../components/LoadingIndicator';
import { uploadImage } from '../controllers/axios';


export default function TopBtns() {
    return (
        <View style={styles.topBtns}>
            <IconButton
                icon="info"
                size={30}
                onPress={() => handelButtonClick("camera")}
                color="#F6F6F6"
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    left: -150,
                    top: 20,
                }}
            />
            <IconButton
                icon="history"
                size={30}
                onPress={() => handelButtonClick("camera")}
                color="#F6F6F6"
                style={{
                    width: 40,
                    height: 40,
                    alignSelf: 'center',
                    borderRadius: 100,
                    //allgin this item to the to right of the screen
                    right: -150,
                    top: 20,
                }}
            />
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
    },
});