import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image } from 'react-native';

export const Post = (props) => {
    return (
        <View style={styles.post}>
            <View style={styles.id}>
                <Text>{props.id}</Text>
            </View>
            <View style={styles.details}>
                <Text>{props.title}</Text>
                <Text>{props.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },

    details: {
        justifyContent: 'center',
        marginLeft: 10
    },

    id: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.1)',
    }
});