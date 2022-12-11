import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from "formik";
import axios from "axios";
import SimpleToast from "react-native-simple-toast";

export const Register = ({navigation}) => {

    return(
        <View style={styles.mainContainer}>
            <Formik initialValues={{name: '', email: '', password: '', phoneNumber: ''}} onSubmit={(values) => {
                axios.post('https://blank-ujvao.run-eu-central1.goorm.io/api/v1/user/', {
                    'email': values.email.toLowerCase(),
                    'password': values.password,
                    'name': values.name,
                    'phoneNumber': values.phoneNumber,
                })
                    .then(function (response) {
                        console.log(response.data.message);
                        if (response.status === 201){
                            navigation.navigate('Login')
                            SimpleToast.show('Done', SimpleToast.LONG)
                        } else {
                            SimpleToast.show(response.data.message, SimpleToast.LONG)
                        }
                    })
                    .catch(function (error) {
                        SimpleToast.show(JSON.stringify(error.message), SimpleToast.LONG)
                    });
            }}>
                {(props) => (
                    <View style={styles.container}>
                        <Text>Имя</Text>
                        <TextInput style={styles.input} value={props.values.name} placeholder = 'Введите имя' onChangeText={props.handleChange('name')} />
                        <Text>Телефон</Text>
                        <TextInput style={styles.input} value={props.values.phoneNumber} placeholder = 'Введите телефон' onChangeText={props.handleChange('phoneNumber')} />
                        <Text>Email</Text>
                        <TextInput style={styles.input} value={props.values.email} placeholder = 'Введите email' onChangeText={props.handleChange('email')} />
                        <Text>Пароль</Text>
                        <TextInput style={styles.input} secureTextEntry={true} value={props.values.password} placeholder = 'Введите пароль' onChangeText={props.handleChange('password')} />
                        <View style={styles.buttonContainer}>
                            <Button title='Зарегистрироваться' onPress={props.handleSubmit} />
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