// create a cool looking avatar list like in discord
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";
import ListItem from "./ListItem";

export default function List({ navigation, data, name }) {
    const [DATA, setData] = useState(data.data);

    //sort DATA by rating
    const sortData = (data) => {
        data.sort((a, b) => {
            return b.rating - a.rating;
        });
        return data;
    }
    sortData(DATA);
    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item }) => {
        const backgroundColor = (item.title || item.name || item.slug) === selectedId ? "gray" : "transparent";
        const color = (item.title || item.name || item.slug) === selectedId ? "transparent" : "black";
        return (
            <ListItem
                item={item}
                onPress={() => {
                    setSelectedId((item.title || item.name || item.slug));
                    navigation.navigate("VedioList", { url: item.url });
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {name && <Text style={styles.text}>{name}</Text>}
            <FlatList
                data={DATA}
                renderItem={(item) => renderItem(item)}
                keyExtractor={(item) => item.title || item.name}
                extraData={selectedId}
                styles={styles.list}
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
    list: {
        flex: 1,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        //center
        alignSelf: "center",
    },
});
