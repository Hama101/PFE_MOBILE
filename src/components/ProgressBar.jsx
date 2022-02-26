import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Animated, Text, View } from "react-native";



export default function Progress({ step, steps, height, name }) {
    const [width, setWidth] = React.useState(0);

    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-100)).current;

    // start the animation on this compents load one time
    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    // set the reactive animation on the change of the width or the step
    React.useEffect(() => {
        // -width + width * step / steps
        reactive.setValue(-width + width * step / steps);
    }, [width, step]);

    return (
        <>
            <View style={styles.info}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: "900", color: '#F6F6F6', }}>
                    {step * 10} %
                </Text>
            </View>
            <View style={{
                height,
                backgroundColor: '#fff',
                borderRadius: height,
                overflow: 'hidden',
            }}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setWidth(width);
                }}
            >
                <Animated.View
                    style={{
                        height: height,
                        borderRadius: height,
                        backgroundColor: 'orange',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        transform: [
                            {
                                translateX: animatedValue,
                            }
                        ]
                    }}
                />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    //algin this item child one to the left and one to the right of the screen
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 12,
        fontWeight: '900',
        marginBottom: 10,
        //align this item to the right of the screen
        alignSelf: 'flex-end',
        color: '#fff',
    }
})
