import React from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { Loading } from "../src/Loading";


export const FullPost = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = React.useState(true)
    const [data, setData] = React.useState([]);
    const { id, title } = route.params;

    React.useEffect(() => {
        navigation.setOptions(
            { title }
        )
        axios
            .get('https://blank-ujvao.run-eu-central1.goorm.io/api/v1/products/' + id)
            .then(({ data }) => {
                setData(data[0])
                console.log(data[0])
            })
            .catch((err) => {
                console.log(err)
                SimpleToast.show('Ошибка получения', SimpleToast.LONG)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.post}>
                <Text>id: </Text>
                <Text>{data.product_id}</Text>
            </View>
            <View style={styles.post}>
                <Text>Product name: </Text>
                <Text>{data.product_name}</Text>
            </View>
            <View style={styles.post}>
                <Text>Category: </Text>
                <Text>{data.category_name}</Text>
            </View>
            <View style={styles.post}>
                <Text>Manufacturer: </Text>
                <Text>{data.manufacturer_name}</Text>
            </View>
            <View style={styles.post}>
                <Text>Price: </Text>
                <Text>{data.price}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    post: {
        flexDirection: 'row'
    }
});