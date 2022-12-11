import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import axios from "axios";
import {Formik} from "formik";
import SimpleToast from 'react-native-simple-toast';

export const Login = ({navigation}) => {

    return(
        <View style={styles.mainContainer}>
            <Formik initialValues={{email: '', password: ''}} onSubmit={(values) => {
                axios.post('https://blank-ujvao.run-eu-central1.goorm.io/api/v1/user/auth', {
                    'email': values.email.toLowerCase(),
                    'password': values.password
                })
                    .then(function (response) {
                        console.log(response.data.message);
                        SimpleToast.show(response.data.message, SimpleToast.LONG)
                        if (response.data.message === 'successfully'){
                            navigation.navigate('Home')
                        }
                    })
                    .catch(function (error) {
                        if (error.message === 'Request failed with status code 404')
                        SimpleToast.show('Отсутствует соединение с сервером', SimpleToast.LONG)
                    });
            }}>
                {(props) => (
                    <View style={styles.container}>
                        <Text>Email</Text>
                        <TextInput style={styles.input} value={props.values.email} placeholder = 'Введите email' onChangeText={props.handleChange('email')} />
                        <Text>Пароль</Text>
                        <TextInput style={styles.input} secureTextEntry={true} value={props.values.password} placeholder = 'Введите пароль' onChangeText={props.handleChange('password')} />
                        <View style={styles.buttonContainer}>
                            <Button title='Зарегистрироваться' onPress={() => navigation.navigate('Register')} />
                            <Button title='Войти' onPress={props.handleSubmit}/>
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