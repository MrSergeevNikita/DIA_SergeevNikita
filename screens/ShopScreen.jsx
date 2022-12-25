import {Button, ScrollView, StyleSheet, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { setProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ShopScreen({ navigation }) {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    useEffect(() => {
        async function getAllProducts() {
            await axiosInstance.get('/roads-depth').then((response) => dispatch(setProducts(response?.data)));
        }
        getAllProducts();
    }, [dispatch]);

    const handlePress = () => {
        navigation.navigate('Корзина');
    };

    return (
        <ScrollView>
            <Icon.Button
                name="shopping-cart"
                onPress={handlePress}
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                }}> Корзина
            </Icon.Button>
            <View>
                {!!products &&
                    products.map((product) => <ProductCard key={product.id} {...product} navigation={navigation} />)}
            </View>
        </ScrollView>
    );

}
