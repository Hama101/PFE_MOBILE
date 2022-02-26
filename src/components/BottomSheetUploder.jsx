import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { MotiView } from '@motify/components'

export default function BottomSheetUploder({ navigation, route }) {
    // handelling the loading animation
    const [isLoading, setIsLoading] = useState(false);
    const LoadingIndicator = ({ size }) => {
        return (
            <MotiView

            />
        );
    };
    //display loading animation
    const handleLoading = () => {
        setIsLoading(true);
        console.log("loading...");
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    };
    console.log("aaaa", navigation);
    const handelButtonClick = async (type) => {
        let result;
        if (type === "Camera") {
            // No permissions request is necessary for launching the image library
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 1,
            });
        } else if (type === "Gallery") {
            // No permissions request is necessary for launching the image library
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 1,
            });
        }
        console.log(result);
        handleLoading();
        // godwa rak wsalit lil navigation xD !!!
        navigation.navigate("ImageUploaded", { imgUri: result.uri });
    }
    const HandelRendering = () => {
        if (isLoading) {
            return <LoadingIndicator size={50} />;
        } else {
            return (
                <>
                    <View style={styles.camBtn}>
                        <Button
                            title="Camera"
                            onPress={() => handelButtonClick('Camera')}
                            color={Colors.purple800}
                        />
                    </View>
                    <View style={styles.camBtn}>
                        <Button
                            title="Gallery"
                            onPress={() => handelButtonClick('Gallery')}
                            color={Colors.green800}
                        />
                    </View>
                </>
            )
        }
    }
    return (
        <View>
            {HandelRendering()}
        </View>
    );
}
const styles = StyleSheet.create({
    camBtn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
    },
});
