import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchPayment } from '@/config/api';
import { IModelPaginate, IPayment } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        page: number;
        pageSize: number;
        pages: number;
        total: number;
    },
    result: IPayment[]
}

export const fetchPayment = createAsyncThunk(
    'payment/fetchPayment',
    async ({ query }: { query: string }) => {
        const response = await callFetchPayment(query);
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


export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPayment.pending, (state, action) => {
            state.isFetching = true;
        })

        builder.addCase(fetchPayment.rejected, (state, action) => {
            state.isFetching = false;
        })

        builder.addCase(fetchPayment.fulfilled, (state, action) => {
            const payload = action.payload;
            if (payload && payload.data) {
                const pageData = payload.data as unknown as IModelPaginate<IPayment>;
                state.isFetching = false;
                state.meta = pageData.meta;
                state.result = pageData.result;
            }
        })
    },

});

export const {

} = paymentSlice.actions;

export default paymentSlice.reducer;
