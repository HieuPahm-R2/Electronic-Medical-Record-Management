// dispatch.ts
import type { AppDispatch } from "./store";

let globalDispatch: AppDispatch | null = null;

export const injectStore = (dispatch: AppDispatch) => {
    globalDispatch = dispatch;
};

export const dispatchFromAnywhere: AppDispatch = ((action: any) => {
    if (!globalDispatch) {
        console.warn("Dispatch chưa được inject vào globalDispatch!");
        return;
    }
    return globalDispatch(action);
}) as AppDispatch;
