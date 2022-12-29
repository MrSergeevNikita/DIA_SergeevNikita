import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../api';

export const AddRoad = ({ resetType }) => {
    const { highways } = useSelector((store) => store.road);
    const [name, setName] = useState('');
    const [road_length, setRoad_length] = useState('');
    const [id_highway, setId_highway] = useState('');
    const [price, setPrice] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!!name && !!road_length && !!id_highway && !!price) {
            const values = { name, road_length, id_highway, price };
            await axiosInstance.post('roads/', values);
            resetType();
        }
    };
    return (
        <form onSubmit={handleSubmit} className='md:w-[600px] flex flex-col gap-1'>
            <p className='font-bold'>Название: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p className='font-bold'>Расстояние: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={road_length}
                type='number'
                onChange={(e) => setRoad_length(e.target.value)}
            />
            <p className='font-bold'>Трасса: </p>
            <select className='h-7 rounded-md' onChange={(e) => setId_highway(e.target.value)}>
                <option disabled>Трасса</option>
                {highways.length > 0 && highways.map((highway) => <option value={highway.id}>{highway.title}</option>)}
            </select>
            <p className='font-bold'>Стоимость: </p>
            <input
                type='number'
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type='submit' className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                Добавить
            </button>
        </form>
    );
};
