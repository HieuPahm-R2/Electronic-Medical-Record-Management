import instance from "./axios.custom";

export const callUploadImage = (file, folder) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    bodyFormData.append('folder', folder);
    return instance({
        method: 'post',
        url: '/api/v1/files',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
// authentication
export const registerAPI = (fullName, email, password, roleId) => {
    return instance.post(`/api/v1/auth/register`, {
        fullName, email, password,
        role: {
            "id": roleId
        }
    })
}
export const loginAPI = (username, password) => {
    return instance.post(`/api/v1/auth/login`, { username, password })
}
export const callFetchAccountAPI = () => {
    return instance.get(`/api/v1/auth/account`)
}
export const LogoutAPI = () => {
    return instance.post('/api/v1/auth/logout')
}
// Create at the same time when creating a patient API

