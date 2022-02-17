import React, { useCallback, useState, useRef, useMemo } from 'react';
import { StyleSheet, Dimensions, View, StatusBar, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import LoadingIndicator from '.././components/LoadingIndicator';
import { Video, AVPlaybackStatus } from 'expo-av';
const { width, height } = Dimensions.get('screen')

//fetching images or vedio from api
const vid_url = "https://www.pexels.com/video/food-pizza-hands-friends-3944334/"
const fetchData = async (keyword) => {
    const API_ROUTE = `https://api.pexels.com/v1/search?query=${keyword}&page=1`
    console.log("API_ROUTE", API_ROUTE);
    const data = await fetch(API_ROUTE, {
        headers: {
            "Authorization": "563492ad6f91700001000001d7c45d66b0234c40b22ae183667ad5b5"
        }
    })
    const { photos } = await data.json()
    return photos.slice(0, 6)
}
const THUMBNAIL_SIZE = 80;
const SPACEING = 10;

export default function VedioList({ navigation, route }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const item = route.params.item
    const [images, setImages] = useState(null)
    React.useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchData(item.title);
            //console.log("************************************\n************************\n*********\n", images);
            setImages(images)
        }
        fetchImages();
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
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={topRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    scrollToActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width));
                }}
                renderItem={({ item }) => (
                    <View style={{ width, height }}>
                        {/* <Image source={{ uri: item.src.portrait }}
                            style={[StyleSheet.absoluteFillObject]}
                            play={true}
                            videoId={'668nUCeBHyY'}
                        /> */}
                        <Video
                            style={[StyleSheet.absoluteFillObject]}
                            ref={video}
                            source={{
                                uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                            paused={false}
                        />
                    </View>
                )}
            />
            <FlatList
                ref={thumbRef}
                data={images}
                keyExtractor={(item) => item.id.toString()}
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
                            source={{ uri: item.src.portrait }}
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
