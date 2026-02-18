import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchPrescription } from '@/config/api';
import { IModelPaginate } from '@/types/backend';
import { IPrescription } from '@/types/medical';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IPrescription[]
}

export const fetchPrescription = createAsyncThunk(
    'prescription/fetchPrescription',
    async ({ query }: { query: string }) => {
        const response = await callFetchPrescription(query);
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


export const prescriptionSlice = createSlice({
    name: 'prescription',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPrescription.pending, (state, action) => {
            state.isFetching = true;
        })

        builder.addCase(fetchPrescription.rejected, (state, action) => {
            state.isFetching = false;
        })

        builder.addCase(fetchPrescription.fulfilled, (state, action) => {
            const payload = action.payload;
            if (payload && payload.data) {
                const pageData = payload.data as unknown as IModelPaginate<IPrescription>;
                state.isFetching = false;
                state.meta = pageData.meta;
                state.result = pageData.result;
            }
        })
    },

});

export const {

} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
