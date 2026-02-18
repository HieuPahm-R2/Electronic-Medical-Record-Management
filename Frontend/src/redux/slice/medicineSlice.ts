import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchMedicine } from '@/config/api';
import { IModelPaginate } from '@/types/backend';
import { IMedicine } from '@/types/medicine';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IMedicine[]
}

export const fetchMedicine = createAsyncThunk(
    'medicine/fetchMedicine',
    async ({ query }: { query: string }) => {
        const response = await callFetchMedicine(query);
        return response;
    }
)

const initialState: IState = {
    isFetching: true,
    meta: {
        page: 1,
        pageSize: 10,
        pages: 0,
        total: 0
    },
    result: []
};


export const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMedicine.pending, (state, action) => {
            state.isFetching = true;
        })

        builder.addCase(fetchMedicine.rejected, (state, action) => {
            state.isFetching = false;
        })

        builder.addCase(fetchMedicine.fulfilled, (state, action) => {
            const payload = action.payload;
            if (payload && payload.data) {
                const pageData = payload.data as unknown as IModelPaginate<IMedicine>;
                state.isFetching = false;
                state.meta = pageData.meta;
                state.result = pageData.result;
            }
        })
    },

});

export const {

} = medicineSlice.actions;

export default medicineSlice.reducer;
