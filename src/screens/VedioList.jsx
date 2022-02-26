import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Dimensions, View, StatusBar, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import VedioPlayer from '../components/VedioPlayer';
const { width, height } = Dimensions.get('screen')
import TopBtns from '../components/TopBtns';


const fetchData = async (url) => {
    const res = await fetch('https://sea-of-food.herokuapp.com/recipe-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url
        })
    });
    const data = await res.json();
    return data;
}
const THUMBNAIL_SIZE = 80;
const SPACEING = 10;

export default function VedioList({ navigation, route }) {
    const [DATA, setData] = useState(null);
    const [images, setImages] = useState(null);
    console.log("the data is : ", DATA);
    React.useEffect(() => {
        const getData = async () => {
            const data = await fetchData(route.params.url);
            setData(data.data);
            setImages(data.data.images);
        }
        getData();
    }, [])
    //console.log('route: ', item);

    //handel the image indexing
    const topRef = React.useRef();
    const thumbRef = React.useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollToActiveIndex = (index) => {
        //setIndex with index
        //scroll flat lists to the index
        setActiveIndex(index);
        topRef?.current?.scrollToOffset({ animated: true, offset: index * width });
        if (index * (THUMBNAIL_SIZE + SPACEING) - THUMBNAIL_SIZE / 2 > width / 2) {
            //if the index is in the middle of the screen
            //scroll flat list to the index
            thumbRef?.current?.scrollToOffset({
                animated: true,
                offset: index * (THUMBNAIL_SIZE + SPACEING) - width / 2 + THUMBNAIL_SIZE / 2
            });
        } else {
            thumbRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        }
    }

    if (!images) {
        // allign the item to the center of the screen
        return <View style={styles.container}>
            <LoadingIndicator size={150} style={styles.loder} />
        </View>;
    }
    return (
        <><TopBtns navigation={navigation} route={route} path="VedioList" />
            <SafeAreaView style={styles.container}>

                <FlatList
                    ref={topRef}
                    data={images}
                    keyExtractor={(item) => item.substring(item.length - 20)}
                    horizontal
                    pagingEnabled
                    showHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        scrollToActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width));
                    }}
                    renderItem={({ item }) => (
                        <View style={{ width, height }}>
                            {
                                <Image source={{ uri: item }}
                                    style={[StyleSheet.absoluteFillObject]}
                                />
                                // <VedioPlayer src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"} />
                            }
                        </View>
                    )}
                />
                <FlatList
                    ref={thumbRef}
                    data={images}
                    keyExtractor={(item) => item.substring(item.length - 20)}
                    horizontal
                    showHorizontalScrollIndicator={false}
                    style={{
                        position: 'absolute',
                        bottom: THUMBNAIL_SIZE / 2,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: SPACEING,
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => scrollToActiveIndex(index)}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: THUMBNAIL_SIZE,
                                    height: THUMBNAIL_SIZE,
                                    borderRadius: 12,
                                    marginRight: SPACEING,
                                    borderWidth: 2,
                                    borderColor: activeIndex === index ? '#fff' : "transparent",
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView >
        </>
    )
}

const styles = StyleSheet.create({
    // center it child elements
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: '50%',
        color: 'white',
    },
    //algin this item
    loder: {
        alignSelf: 'center',
        marginTop: '50%',
    },

})
