import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
export default function Heart({ likes }) {
    //if likes containes Ratings string change it to likes string
    likes = likes.includes('Rating') ? likes.split(' ')[1] + " Likes" : likes;
    return (
        <SafeAreaView style={styles.container}>
            <AntDesign name="heart" size={24} color="white" />
            <Text style={styles.name} >{likes}</Text>
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
