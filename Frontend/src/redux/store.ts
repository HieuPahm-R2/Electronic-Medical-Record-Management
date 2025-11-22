import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import roleReducer from '@/redux/slice/roleSlice';
import accountReducer from './slice/accountSlice';
import permissionReducer from './slice/permissionSlice';
import userReducer from './slice/userSlice';
import { injectStore } from './dispatch';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        role: roleReducer,
        permission: permissionReducer,
        user: userReducer,
    }
})
injectStore(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;