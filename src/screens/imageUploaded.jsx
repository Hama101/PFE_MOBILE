import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView } from 'react-native';
import Avatars from '../components/avatars';
import TopBtns from '../components/TopBtns';

export default function ImageUploaded({ navigation, route }) {
    const [imgUri, setImageUri] = useState(route.params.imgUri);
    const [data, setData] = useState(route.params.data);
    console.log("imgUri", imgUri);
    console.log("Data --->", data)
    // create a avatar compeonent

    return (
        <>
            <TopBtns navigation={navigation} route={route} path="ImageUploaded" />
            <SafeAreaView style={styles.container}>
                <SafeAreaView style={styles.uploadedImgHoler}>
                    <Image source={{ uri: imgUri }} style={styles.uploadedImg} />
                    <Text style={styles.name}>Our Predictions</Text>
                    <Avatars navigation={navigation} data={data} style={styles.holder} />
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
    uploadedImg: {
        flex: 0.5,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        //center
        alignSelf: 'center',
    },
    name: {
        fontSize: 20,
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
});
