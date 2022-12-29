import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { setRoads } from '../store/reducers/roadReducer';
import ticket from '../images/ticket.png';

export const ManagerRoadCard = (props) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(props.name);
    const [newRoad_length, setNewRoad_length] = useState(props.road_length);
    const [newPrice, setNewPrice] = useState(props.price);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        if (!!newName && !!newRoad_length && !!newPrice) {
            const values = {
                name: newName,
                road_length: newRoad_length,
                price: +newPrice,
            };
            console.log(values);
            await axiosInstance.put(`roads/${props.id}/`, values).then(async () => {
                await axiosInstance
                    .get('roads-depth')
                    .then((response) => dispatch(setRoads({ roads: response?.data })));
            });
        }
    };

    const handleDelete = async () => {
        const values = {
            id: props.id,
            name: props.name,
            road_length: props.road_length,
            price: props.price,
        };
        await axiosInstance.delete(`roads/${props.id}/`, values).then(async () => {
            await axiosInstance.get('roads-depth').then((response) => dispatch(setRoads({ roads: response?.data })));
        });
    };

    const handleNavigate = () => {
        navigate(`/road/${props.id}`);
    };
    return (
        <div className='p-8 border w-[560px] flex flex-col justify-center items-center cursor-pointer my-8'>
            <img src={ticket} alt={props.name} className='w-80 object-contain' onClick={handleNavigate} />
            <div className='flex flex-col justify-between'>
                <div>
                    <p className='font-bold'>Трасса: </p>
                    <p>{props.id_highway.title}</p>
                    <p className='font-bold'>Название: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none bg-transparent'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <p className='font-bold'>Расстояние: </p>
                    <input
                        type='number'
                        className='inline-table w-full overflow-y-hidden resize-none bg-transparent'
                        value={newRoad_length}
                        onChange={(e) => setNewRoad_length(e.target.value)}
                    />

                    <p className='font-bold'>Стоимость: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none bg-transparent'
                        type='number'
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <button onClick={handleUpdate} className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Сохранить
                    </button>
                    <button onClick={handleDelete} className='bg-red-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};
