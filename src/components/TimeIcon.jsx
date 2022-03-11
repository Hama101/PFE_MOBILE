import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function TimeIcon({ time }) {
    return (
        <SafeAreaView style={styles.container}>
            <Entypo name="stopwatch" size={24} color="white" />
            <Text style={styles.name}>{time}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // algin it child elements on the same line
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
    },
    name: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
});
