import {View, Text, Image, StyleSheet, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { resetProduct, setProduct } from '../store/productSlice';
import ticket from "../static/ticket.png";

export default function ProductScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);

    useEffect(() => {
        async function getOneProduct() {
            await axiosInstance.get(`/roads-depth/${id}`).then((response) => dispatch(setProduct(response?.data)));
        }
        getOneProduct();
        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    const handleClick = () => {
        const addBasket = async () => {
            const values = {
                status: 'Оплачено',
                id_road: +id,
                id_customer: 1,
            };
            const response = await axiosInstance.post('orders/', values);
            console.log(response);
        };
        addBasket();
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={ticket} />
            <Text style={styles.text}>Название: {product.name}</Text>
            <Text style={styles.text}>Магистраль: {product?.id_highway?.title}</Text>
            <Text style={styles.text}>Стоимость: {product.price} р.</Text>
            <Text style={styles.text}>Длина: {product.road_length} км</Text>
            <Button title='Добавить в корзину' onPress={handleClick} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        gap: 12,
        marginBottom: 8,
    },
    image: {  width: 400, height: 400 , alignSelf: 'stretch', alignItems:'center',justifyContent: 'center' },
    text: { color: '#111', fontSize: 16 },
});
