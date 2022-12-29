import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { RoadCard } from '../components/RoadCard';
import { resetHighway, setHighway, setHighways, setRoads } from '../store/reducers/roadReducer';

export const HomePage = () => {
    const { highways, highway: selectedHighway, roads } = useSelector((store) => store.road);
    const dispatch = useDispatch();
    const [q, setQ] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchHighways = async () => {
            await axiosInstance.get('/highways/').then((response) => dispatch(setHighways(response?.data)));
        };

        const fetchRoads = async (id) => {
            await axiosInstance
                .get('/roads-depth/', { params: value })
                .then((response) => dispatch(setRoads({ roads: response?.data, id })));
        };

        fetchHighways();
        fetchRoads(selectedHighway.id);
    }, [dispatch, selectedHighway.id, value]);

    const handleHighway = async (id) => {
        if (+selectedHighway.id === +id) {
            dispatch(resetHighway());
        } else {
            setQ('');
            setMin('');
            setMax('');
            setValue('');
            await axiosInstance.get(`/highways/${id}/`).then((response) => dispatch(setHighway(response?.data)));
            await axiosInstance
                .get('/roads-depth/')
                .then((response) => dispatch(setRoads({ roads: response?.data, id })));
        }
    };

    const handleReset = () => {
        setQ('');
        setMax('');
        setMin('');
        setValue({});
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'>{selectedHighway.title ? selectedHighway.title : 'Главная'}</Link> <p>/</p>
            </div>
            <div className='flex gap-2 my-8'>
                {highways.map((highway) => (
                    <button
                        key={highway.id}
                        className={`py-4 px-8 border rounded-xl ${
                            highway.title === selectedHighway.title && 'bg-gray-300'
                        }`}
                        onClick={() => handleHighway(highway.id)}
                    >
                        {highway.title}
                    </button>
                ))}
            </div>
            <div>
                <div>
                    <p>Название</p>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='Введите значение...'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Минимальная стоимость</p>
                    <input
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Максимальная стоимость</p>
                    <input
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <button onClick={() => setValue({ q, min_cost: min, max_cost: max })}>Искать</button>
                <button className='ml-4' onClick={handleReset}>
                    Сбросить
                </button>
            </div>
            {roads && (
                <div className='flex gap-3 my-4 overflow-hidden flex-row flex-wrap'>
                    {roads.map((road) => (
                        <RoadCard key={road.id} {...road} />
                    ))}
                </div>
            )}
        </div>
    );
};
