import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from '@motify/components'
import LoadingIndicator from '../components/LoadingIndicator';

export default function Home(navigation) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    //display loading animation
    const handleLoading = async () => {
        setIsLoading(true);
        console.log("loading...");
        let res = setTimeout(() => {
            setIsLoading(false);
        }, 10000);
        console.log(res);
    };

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handelButtonClick = () => {
        setIsOpen(!isOpen);
    }
    const handelButtonPizzaClick = async () => {
        let result = undefined;
        // No permissions request is necessary for launching the image library
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });
        if (result.uri !== undefined) {
            navigation.navigation.navigate("ImageUploaded", { imgUri: result.uri });
        } else {
            console.log("no result");
        }
    }
    const handelRendering = () => {
        if (isLoading) {
            return <LoadingIndicator size={100} />;
        } else {
            return (
                <>
                    {isOpen
                        ? <IconButton
                            icon="close"
                            color={Colors.black}
                            size={150}
                            onPress={handelButtonClick}
                            color={Colors.red100}
                            style={{
                                borderRadius: 2,
                                borderWidth: 80,
                                borderColor: '#fff',
                                shadowColor: '#fff',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2
                            }}
                        />
                        : <MotiView
                            from={{
                                width: 200,
                                height: 200,
                                borderRadius: 200 / 2,
                                borderWidth: 0,
                                shadowOpacity: 0.3,
                            }}
                            animate={{
                                width: 200 + 40,
                                height: 200 + 40,
                                borderRadius: 200 / 2 + 20,
                                borderWidth: 200 / 20,
                                shadowOpacity: 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 1000,
                                loop: true,
                                repeatReverse: true,
                            }}
                            style={{
                                borderRadius:  150,
                                borderWidth: 2,
                                borderColor: Colors.white,
                                shadowColor: Colors.white,
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2
                            }}
                        >
                            <IconButton
                                icon="pizza"
                                color={Colors.black}
                                size={80}
                                onPress={handelButtonPizzaClick}
                                color={Colors.white}
                                style={{
                                    width: 200,
                                    height: 150,
                                    alignSelf: 'center',
                                }}
                            />
                        </MotiView>
                    }
                </>
            )
        }
    }
    return (
        <View style={styles.container}>
            {handelRendering()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
