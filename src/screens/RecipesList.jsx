import { useEffect, useState, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView } from 'react-native';
import List from '../components/List';
import TopBtns from '../components/TopBtns';
import LoadingIndicator from '../components/LoadingIndicator';


//data fetching section
const fetchData = async (keyword) => {
    const response = await fetch(`https://sea-of-food.herokuapp.com/${keyword}`);
    const data = await response.json();
    return data;
}

export default function RecipesList({ navigation, route }) {
    const [data, setData] = useState(null);
    const [item, setItem] = useState(route.params.item);
    console.log("item", item);
    console.log("data", data);
    // get the data on the components mount
    useEffect(() => {
        const getData = async () => {
            const res = await fetchData(item.name);
            setData(res);
        }
        getData();
    }, [])

    return (
        <>
            {!data
                ? (<LoadingIndicator />)
                : (
                    <>
                        <TopBtns navigation={navigation} route={route} path="RecipesList" />
                        <SafeAreaView style={styles.container}>
                            <List navigation={navigation} data={data} style={styles.holder} name={item.name} />
                        </SafeAreaView>
                    </>
                )
            }
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
