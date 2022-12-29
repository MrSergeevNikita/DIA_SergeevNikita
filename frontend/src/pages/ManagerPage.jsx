import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { AddRoad } from '../components/AddRoad';
import { ManagerRoadCard } from '../components/ManagerRoadCard';
import { ManagerOrderCard } from '../components/ManagerOrderCard';
import { setOrders } from '../store/reducers/orderReducer';
import { setHighways, setRoads } from '../store/reducers/roadReducer';
import { AddHighway } from '../components/AddHighway';
import { ManagerHighwayCard } from '../components/ManagerHighwayCard';

export const ManagerPage = () => {
    const dispatch = useDispatch();
    const { roads, highways } = useSelector((store) => store.road);
    const { orders } = useSelector((store) => store.order);
    const [type, setType] = useState('');
    const [orderType, setOrderType] = useState('all');
    useEffect(() => {
        const fetchRoads = async () => {
            await axiosInstance.get('roads-depth/').then((response) => dispatch(setRoads({ roads: response?.data })));
        };
        const fetchHighways = async () => {
            await axiosInstance.get('highways/').then((response) => dispatch(setHighways(response?.data)));
        };
        const fetchOrders = async () => {
            await axiosInstance.get('orders-depth/').then((response) => dispatch(setOrders(response?.data)));
        };
        type === 'Участки' ? fetchRoads() && fetchHighways() : type === 'Заказы' ? fetchOrders() : fetchHighways();
    }, [dispatch, type]);
    return (
        <div className='p-8 flex flex-col gap-4'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Панель менеджера</Link>
            </div>
            <div className='flex gap-4'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Трассы' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Трассы')}
                >
                    Трассы
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Участки' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Участки')}
                >
                    Участки
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Заказы' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Заказы')}
                >
                    Заказы
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'newHighway' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('newHighway')}
                >
                    Добавить трассу
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'newRoad' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('newRoad')}
                >
                    Добавить участок
                </button>
            </div>
            <div>
                {type === 'Трассы' ? (
                    highways?.length > 0 &&
                    highways.map((highway) => <ManagerHighwayCard key={highway.id} {...highway} />)
                ) : type === 'Участки' ? (
                    roads?.length > 0 && roads.map((road) => <ManagerRoadCard key={road.id} {...road} />)
                ) : type === 'Заказы' ? (
                    orders.length > 0 && (
                        <div>
                            <div className='flex gap-2 mb-4'>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'all' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('all')}
                                >
                                    Все
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Оформлено' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Оформлено')}
                                >
                                    Оформлено
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Завершен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Завершен')}
                                >
                                    Завершен
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Отменен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Отменен')}
                                >
                                    Отменен
                                </button>
                            </div>
                            {orders.map((order) =>
                                orderType === 'all' ? (
                                    <ManagerOrderCard key={order.id} {...order} />
                                ) : (
                                    orderType === order.status && <ManagerOrderCard key={order.id} {...order} />
                                )
                            )}
                        </div>
                    )
                ) : type === 'newRoad' ? (
                    <AddRoad resetType={() => setType('')} />
                ) : (
                    type === 'newHighway' && <AddHighway resetType={() => setType('')} />
                )}
            </div>
        </div>
    );
};
