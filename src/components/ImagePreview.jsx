import { StyleSheet, Image } from 'react-native';



export default function ImagePreview({ source }) {
    return (
        <Image source={{ uri: source }} style={styles.uploadedImg} />
    )
}

const styles = StyleSheet.create({
    uploadedImg: {
        flex: 0.5,
        width: '100%',
        height: '60%',
        borderRadius: 10,
        //center
        alignSelf: 'center',
    },
});
