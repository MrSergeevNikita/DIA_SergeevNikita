import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    highways: [],
    highway: {},
    roads: [],
    road: {},
};

const roadSlice = createSlice({
    name: 'road',
    initialState,
    reducers: {
        setHighways: (state, { payload }) => {
            state.highways = payload;
        },
        setHighway: (state, { payload }) => {
            state.highway = payload;
        },
        setRoads: (state, { payload }) => {
            console.log(payload);
            if (!!payload.id) {
                state.roads = payload.roads.filter((road) => road.id_highway.id === payload.id);
            } else {
                state.roads = payload.roads;
            }
        },
        setRoad: (state, { payload }) => {
            state.road = payload;
        },
        resetHighway: (state) => {
            state.highway = {};
        },
    },
});

export const roadReducer = roadSlice.reducer;

export const { resetHighway, setHighway, setHighways, setRoad, setRoads } = roadSlice.actions;
