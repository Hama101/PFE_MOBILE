import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

import { Video, AVPlaybackStatus } from 'expo-av';
const { width, height } = Dimensions.get('screen')


export default function VedioPlayer({ src }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    React.useEffect(() => {
        return () => {
            video.current.pauseAsync()
        }
    }, [])

    return (
        <View style={[StyleSheet.absoluteFillObject]}>
            <Video
                ref={video}
                style={[StyleSheet.absoluteFillObject]}
                source={{
                    uri: src,
                }}
                useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.description}>
                <Text style={styles.title}>
                    Text
                </Text>
                <View style={styles.steps}>
                    <Text style={styles.step}>
                        . etape 1 : bla bla bla bla
                    </Text>
                    <Text style={styles.step}>
                        . etape 1 : bla bla bla bla
                    </Text>
                    <Text style={styles.step}>
                        . etape 1 : bla bla bla bla
                    </Text>
                    <Text style={styles.step}>
                        . etape 1 : bla bla bla bla
                    </Text>
                    <Text style={styles.step}>
                        . etape 1 : bla bla bla bla
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },//split the screen between video and description
    video: {
        width: width,
        height: height / 2.,
    },
    description: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        // aligin this item to the center of the screen
        alignSelf: 'center',
        marginBottom: 10,
        paddingTop: 30,
    },
    steps: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        padding: 10,
        paddingTop: 30,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    step: {
        fontSize: 16,
        color: '#fff',
    },
}); 
