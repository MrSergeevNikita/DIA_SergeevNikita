import React from 'react';
import { useNavigate } from 'react-router-dom';
import ticket from '../images/ticket.png';

export const RoadCard = (props) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/road/${props.id}`);
    };
    return (
        <div
            onClick={handleNavigate}
            className='p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col cursor-pointer my-8'
        >
            <img src={ticket} alt={props.name} />
            <p>
                <strong>Трасса:</strong> {props.id_highway.title}
            </p>
            <p>
                <strong>Название:</strong> {props.name}
            </p>
            <p>
                <strong>Стоимость:</strong> {props.price}
            </p>
        </div>
    );
};
