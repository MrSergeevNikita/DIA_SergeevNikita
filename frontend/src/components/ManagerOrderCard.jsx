import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api';
import { setOrders } from '../store/reducers/orderReducer';
import ticket from '../images/ticket.png';

export const ManagerOrderCard = (props) => {
    const dispatch = useDispatch();
    const handleUpdate = async (status) => {
        const values = { status };
        await axiosInstance.put(`orders/${props.id}/`, values).then(async () => {
            await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
        });
    };
    return (
        <div className='p-8 md:w-[720px] border rounded-md flex flex-col md:flex-row gap-8 items-start'>
            <img src={ticket} alt={props?.id_road.name} className='w-96' />
            <div>
                <p>Название: {props?.id_road.name}</p>
                <p>Стоимость: {props?.id_road.price}</p>
                <p>Пользователь: {props?.id_customer?.email}</p>
                <p>Дата оплаты: {dayjs(props.order_date).format('YYYY.MM.DD HH:mm')}</p>
                <p>Статус: {props?.status}</p>
                {(props.status === 'Завершен' || props.status === 'Отменен') && (<p>Дата завершения: {dayjs(props.order_date_finish).format('YYYY.MM.DD HH:mm')}</p>)}
                {(props.status === 'Оформлен') && (<select onChange={(e) => handleUpdate(e.target.value)} className='bg-transparent'>
                    <option disabled>Статус заказа</option>
                    {(props.status === 'Оформлен') && <option selected={props.status === 'Оформлено'} value='Оформлено'>
                        Оформлено
                    </option>}
                    {(props.status === 'Оформлен') && <option selected={props.status === 'Отменен'} value='Отменен'>
                        Отменен
                    </option>}
                    {(props.status === 'Оформлен') && <option selected={props.status === 'Завершен'} value='Завершен'>
                        Завершен
                    </option>}
                </select>)}
            </div>
        </div>
    );
};
