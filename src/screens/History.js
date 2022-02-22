import React, { useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import TopBtns from '../components/TopBtns';

export default function History({ navigation, route }) {

    return (
        <>
            <TopBtns navigation={navigation} route={route} path="ImageUploaded" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>History</Text>
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
