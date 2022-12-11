import axios from 'axios';
import React from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, TextInput} from 'react-native';
import {Post} from '../src/Post';
import SimpleToast from 'react-native-simple-toast';
import {Loading} from '../src/Loading';
import {SearchComponent} from "../src/SearchComponent";
import ModalDropdown from 'react-native-modal-dropdown';

export const Home = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState(true)
    const [items, setItems] = React.useState([]);
    const [categories, setCategory] = React.useState([]);
    const [term, setTerm] = React.useState("");

    const fetchPosts = (t) => {
        setIsLoading(true)
        axios
            .get(`https://blank-ujvao.run-eu-central1.goorm.io/api/v1/products?term=${t}`)
            .then(({data}) => {
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
    const fetchCategories = () => {
        axios
            .get(`https://blank-ujvao.run-eu-central1.goorm.io/api/v1/category`)
            .then(({data}) => {
                setCategory(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const refreshPost = () => {
        setIsLoading(true)
        axios
            .get(`https://blank-ujvao.run-eu-central1.goorm.io/api/v1/products`)
            .then(({data}) => {
                setItems(data)
            })
            .catch((err) => {
                console.log(err)
                SimpleToast.show('Ошибка получения', SimpleToast.LONG)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

/*    React.useEffect(refreshPost, []);*/
    React.useEffect(fetchCategories, [])
    React.useEffect(() => {
        fetchPosts(term);
    }, [term]);

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View style={styles.container}>
            <SearchComponent onSearchEnter={(newTerm) => {
                setTerm(newTerm);
            }}/>
            <View style={styles.filters}>
                <ModalDropdown defaultValue='Категория ∨' options={category}/>
                <ModalDropdown defaultValue='Производитель ∨' options={['option 1', 'option 2']}/>
            </View>
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshPost}/>}
                Toache
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FullPost', {
                        id: item.product_id,
                        title: item.product_name
                    })}>
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
    },
    filters: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: 'rgb(234,234,234)',
        paddingVertical:10
    }
});