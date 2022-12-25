import { View, Text, Image, StyleSheet, Button } from 'react-native';
import React from 'react';
import ticket from '../static/ticket.png';

export default function ProductCard({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Товар', { id: props.id });
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={ticket} />
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>{props.price} р.</Text>
            <Button title='Подробнее' onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fdfdfd',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: { width: 400, height: 400 , alignSelf: 'stretch', alignItems:'center',justifyContent: 'center' },
    text: { color: '#111', fontSize: 16 },
});
