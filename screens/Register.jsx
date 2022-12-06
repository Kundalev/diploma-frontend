import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from "formik";

export const Register = ({navigation}) => {

    return(
        <View style={styles.mainContainer}>
            <Formik initialValues={{email: '', password: ''}} onSubmit={(values) => {
                console.log(values)
            }}>
                {(props) => (
                    <View style={styles.container}>
                        <TextInput style={styles.input} value={props.values.email} placeholder = 'Введите email' onChangeText={props.handleChange('email')} />
                        <TextInput style={styles.input} secureTextEntry={true} value={props.values.password} placeholder = 'Введите пароль' onChangeText={props.handleChange('password')} />
                        <View style={styles.buttonContainer}>
                            <Button title='Зарегистрироваться' />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 50,
        width: '70%',
        backgroundColor: 'white',
        marginVertical: 10,
        paddingHorizontal: 15
    },
    buttonContainer: {
        marginTop: 40,
        width: '70%',
        flexDirection: "row",
        justifyContent: "space-around"
    }
});