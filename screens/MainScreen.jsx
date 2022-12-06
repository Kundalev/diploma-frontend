import {StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

export const MainScreen = ({navigation}) => {

    return (<View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
                              style={styles.button}
            >
                <Text>Товары</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
            >
                <Text>Press Here</Text>
            </TouchableOpacity><TouchableOpacity
            style={styles.button}
        >
            <Text>Press Here</Text>
        </TouchableOpacity>
        <ModalDropdown options={['option 1', 'option 2']}/>

        </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", paddingHorizontal: 10
    }, button: {
        alignItems: "center", backgroundColor: "#DDDDDD", padding: 10, margin: 10
    }, countContainer: {
        alignItems: "center", padding: 10
    }
});