import Heart from '../components/Heart';
import TimeIcon from '../components/TimeIcon';
import { View, StyleSheet, Text } from 'react-native';


const Infos = ({ recipe }) => {
    // remove all the words betwen ()
    let name = recipe.name.replace(/\([^)]*\)/g, '');
    // if name contains more than two words take only the first two words
    name = name.split(' ').slice(0, 2).join(' ');
    return (
        <View style={styles.infos}>
            <Heart likes={recipe.rating} />
            <Text style={styles.name}>{name}</Text>
            <TimeIcon time={recipe.time} />
        </View>
    )
}

const styles = StyleSheet.create({
    infos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
    },
})


export default Infos; 