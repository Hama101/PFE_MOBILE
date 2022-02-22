import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from '@motify/components'
import LoadingIndicator from '../components/LoadingIndicator';
import { uploadImage } from '../controllers/axios';
import TopBtns from '../components/TopBtns';
const CAMBTNWID = 150;
const GALBTNWID = 60;

export default function Home({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);

    const handelRendering = () => {
        if (isLoading) {
            return <LoadingIndicator size={100} />;
        } else {
            return (
                <RenderBtns />
            )
        }
    }
    //open gallery or camera
    const handelButtonClick = async (type) => {
        let result = undefined;
        // No permissions request is necessary for launching the image library
        if (type === "gallery") {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
                aspect: [4, 3],
                maxWidth: 300,
                maxHeight: 300,
            });
        } else {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
                aspect: [4, 3],
                maxWidth: 300,
                maxHeight: 300,
            });
        }
        if (!result.cancelled) {
            setIsLoading(true);
            console.log("uploading...", result);
            let response = await uploadImage(result);
            setIsLoading(false);
            if (response) {
                navigation.navigate('ImageUploaded', { imgUri: result.uri, data: response })
            }
        } else {
            console.log("cancelled");
        }
    }

    const RenderBtns = () => {
        return (
            <>
                <TopBtns navigation={navigation} route={route} path="Home" />
                <View style={styles.container}>
                    <MotiView
                        from={{
                            width: CAMBTNWID,
                            height: CAMBTNWID,
                            borderRadius: CAMBTNWID / 2,
                            borderWidth: 0,
                            shadowOpacity: 0.3,
                        }}
                        animate={{
                            width: CAMBTNWID + 40,
                            height: CAMBTNWID + 40,
                            borderRadius: CAMBTNWID / 2 + 20,
                            borderWidth: CAMBTNWID / 20,
                            shadowOpacity: 1,
                        }}
                        transition={{
                            type: 'timing',
                            duration: 1000,
                            loop: true,
                            repeatReverse: true,
                        }}
                        style={{
                            backgroundColor: '#404EED',
                            borderRadius: 150,
                            borderWidth: 2,
                            borderColor: Colors.white,
                            shadowColor: Colors.white,
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2
                        }}
                    >
                        <TouchableOpacity onPress={() => handelButtonClick("camera")} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} style={{ borderRadius: 100 }}>
                            <IconButton
                                icon="camera"
                                size={50}
                                onPress={() => handelButtonClick("camera")}
                                color="#F6F6F6"
                                style={{
                                    width: 150,
                                    height: 150,
                                    alignSelf: 'center',
                                    borderRadius: 100,
                                    //set a fixed posstion  
                                }}
                            />
                        </TouchableOpacity>
                    </MotiView>
                    <IconButton
                        style={styles.btnGalContainer}
                        icon="folder"
                        size={40}
                        onPress={() => handelButtonClick("gallery")}
                        color="#F6F6F6"
                        style={{
                            width: 150,
                            height: 150,
                            alignSelf: 'center',
                            //move the button to the bottom of the screen
                            bottom: -100,
                            borderRadius: 100,
                        }}
                    />
                </View >
            </>
        )
    }


    return (
        <View style={styles.container}>

            {handelRendering()}
        </View>
    );
}


const styles = StyleSheet.create({
    //split the screen height between it to chlid and center them
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCamContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //align to the bottom of the view
        position: 'relative',
        bottom: 0,
    },
    btnGalContainer: {
        //
    },
});
