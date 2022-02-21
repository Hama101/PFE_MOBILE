// create a cool looking avatar list like in discord
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Item from './item';


export default function Avatars(props) {
    const [DATA, setData] = useState(props.data.predections);
    console.log("DATA in avatars --->", DATA);
    // order the data by percentage
    DATA.sort((a, b) => {
        return b.percentage - a.percentage;
    });
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "gray" : "transparent";
        const color = item.id === selectedId ? 'transparent' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    console.log("props.navigation", props.navigation);
                    props.navigation.navigate("VedioList", { item: item });
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: StatusBar.currentHeight || 0,
    },
});