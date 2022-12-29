import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../api';
import { setHighway, setRoad } from '../store/reducers/roadReducer';
import ticket from '../images/ticket.png';
import dayjs from 'dayjs';

export const RoadPage = () => {
    const dispatch = useDispatch();
    const { road, highway } = useSelector((store) => store.road);
    const { id } = useParams();
    const { authorized, user } = useSelector((store) => store.user);

    const handleClick = () => {
        const addBasket = async () => {
            let order_date = new Date();
            order_date.setHours(order_date.getHours() - 3);
            const values = {
                status: 'Оформлен',
                id_road: +id,
                id_customer: user.id,
                order_date: dayjs(order_date).format('YYYY-MM-DD HH:mm:ss'),
            };
            await axiosInstance.post('orders/', values);
        };
        addBasket();
    };

    useEffect(() => {
        const fetchRoad = async () => {
            await axiosInstance.get(`/roads-depth/${id}/`).then((response) => dispatch(setRoad(response?.data)));
        };
        const fetchHighway = async () => {
            await axiosInstance
                .get(`/highways/${road.id_highway.id}`)
                .then((response) => dispatch(setHighway(response?.data)));
        };
        fetchRoad();
        !highway.title && road.id_highway && fetchHighway();
    }, []);
    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>{highway.title ? highway.title : 'Главная'}</Link> <p>/</p>
                <Link to='#'>{road.name}</Link>
            </div>
            {!!road && (
                <div className='p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col justify-center items-start cursor-pointer mt-8'>
                    <img src={ticket} alt={road.name} />
                    <p>
                        <strong>Трасса:</strong> {road?.id_highway?.title}
                    </p>
                    <p>
                        <strong>Название:</strong> {road.name}
                    </p>
                    <p>
                        <strong>Расстояние:</strong> {road.road_length} км
                    </p>
                    <p>
                        <strong>Стоимость:</strong> {road.price} р.
                    </p>
                    {authorized && (
                        <button className='bg-blue-400 w-full rounded-xl mt-2 py-1 text-white' onClick={handleClick}>
                            <strong>Оплатить</strong>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
