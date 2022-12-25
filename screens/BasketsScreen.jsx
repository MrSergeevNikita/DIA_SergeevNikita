import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import {setBasket} from "../store/basketSlice";
import ticket from "../static/ticket.png";

const win = Dimensions.get('window');
export default function BasketScreen() {
    const dispatch = useDispatch();
    const { basket } = useSelector((store) => store.basket);

    useEffect(() => {
        async function getAllProducts() {
            await axiosInstance.get('/orders-depth').then((response) => dispatch(setBasket(response?.data)));
        }
        getAllProducts();
    }, [dispatch]);


        const handleDelete = (id) => {
            const fetchDelete = async (id) => {
                await axiosInstance
                    .delete(`orders/${id}/`)
                    .then(
                        async () =>
                            await axiosInstance.get('orders-depth/')
                                .then((response) => dispatch(setBasket(response?.data)))
                    );
            };
            fetchDelete(id);
        };

    return (
        <ScrollView>
            {basket.map((note) => (
                <View style={styles.card}>
                    <Image style={styles.image} source={ticket} />
                    <Text style={styles.text}>Название: {note?.id_road.name}</Text>
                    <Text style={styles.text}>Статус: Ожидает оплаты</Text>
                    <Text style={styles.text}>Трасса: {note?.id_road.id_highway.title}</Text>
                    <Text style={styles.text}>Стоимость: {note?.id_road.price} р.</Text>
                    <Text style={styles.text}>Длина: {note.id_road.road_length} км</Text>
                    <Button title='Удалить' onPress={() => handleDelete(note.id)} />
                </View>
            ))}
        </ScrollView>
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
    image: { width: 400, height: 400 , alignSelf: 'stretch', alignItems:'center',justifyContent: 'center'},
    text: { color: '#111', fontSize: 16 },
});