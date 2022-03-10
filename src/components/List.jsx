// create a cool looking avatar list like in discord
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import ListItem from "./ListItem";

export default function List({ navigation, data, name }) {
    const [DATA, setData] = useState(data.data);

    // order the data by percentage
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
        const backgroundColor = item.title === selectedId ? "gray" : "transparent";
        const color = item.title === selectedId ? "transparent" : "black";
        return (
            <ListItem
                item={item}
                onPress={() => {
                    setSelectedId(item.title);
                    navigation.navigate("VedioList", { url: item.url });
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        marginTop: StatusBar.currentHeight || 0,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
});
