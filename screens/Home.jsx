import axios from 'axios';
import React from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, TextInput} from 'react-native';
import { Post } from '../src/Post';
import SimpleToast from 'react-native-simple-toast';
import { Loading } from '../src/Loading';
import {SearchComponent} from "../src/SearchComponent";

export const Home = ({ navigation }) => {

    const [isLoading, setIsLoading] = React.useState(true)
    const [items, setItems] = React.useState([]);
    const [term, setTerm] = React.useState("");

    const fetchPosts = (t) => {
        setIsLoading(true)
        axios
            .get(`https://blank-ujvao.run-eu-central1.goorm.io/api/v1/products?term=${t}`)
            .then(({ data }) => {
                setItems(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
                SimpleToast.show('Ошибка получения', SimpleToast.LONG)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const refreshPost = () => {
        setIsLoading(true)
        axios
            .get(`https://blank-ujvao.run-eu-central1.goorm.io/api/v1/products`)
            .then(({ data }) => {
                setItems(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
                SimpleToast.show('Ошибка получения', SimpleToast.LONG)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(refreshPost, []);
    React.useEffect(() => {
        fetchPosts(term);
    }, [term]);

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={styles.container}>
            <SearchComponent onSearchEnter={(newTerm) => {
                setTerm(newTerm);
            }} />
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshPost} />}
                Toache
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.product_id, title: item.product_name })}>
                        <Post
                            title={item.product_name}
                            description={item.manufacturer_name}
                            id={item.product_id}
                        />
                    </TouchableOpacity>
                )
                }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});