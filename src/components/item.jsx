// create a cool looking avatar list like in discord
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image } from "react-native";
import Progress from './ProgressBar';

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const STEPS = 10;

export default function Item({ item, onPress, backgroundColor, textColor }) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
                <Image style={styles.card} source={{ uri: item.image }} />
                <Progress step={Number(item.percentage * 10).toFixed(1)} steps={STEPS} height={20} name={item.name} />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
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
    },
});