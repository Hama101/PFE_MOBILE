// create a cool looking avatar list like in discord
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet} from "react-native";
import Item from './item';


export default function Avatars(props) {
    const DATA = [
        {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "Nature",
            src: props.uri,
            percentage: "0.63",
        },
        {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Water",
            src: props.uri,
            percentage: "0.6",
        },
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Food",
            src: props.uri,
            percentage: "0.3",
        },
        //generate fourth and fifth avatar
        {
            id: "58694a0f-3da1-471f-bd96-145571e29d80",
            title: "Pizza",
            src: props.uri,
            percentage: "0.7",
        },
    ];
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
                    props.navigation.navigate("VedioList", { item: item});
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