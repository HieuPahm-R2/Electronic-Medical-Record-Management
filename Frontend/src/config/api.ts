import instance from './axios.custom';
import { IBackendRes, IBloodTest, IClinicalInfo, IDiagnose, IMedicalExam, IModelPaginate, IPatient, IPermission, IRadiology, IRole, IUser, IVitalSign } from '@/types/backend';

export const callCreateRole = (role: IRole): Promise<IBackendRes<IRole>> => {
    return instance.post('/api/v1/add-role', { ...role })
}

export const callUpdateRole = (role: IRole, id: string): Promise<IBackendRes<IRole>> => {
    return instance.put(`/api/v1/update-role`, { id, ...role })
}

export const callDeleteRole = (id: string): Promise<IBackendRes<IRole>> => {
    return instance.delete(`/api/v1/delete-role/${id}`);
}
export const callFetchRole = (query: string): Promise<IBackendRes<IModelPaginate<IRole>>> => {
    return instance.get(`/api/v1/roles?${query}`);
}

export const callFetchRoleById = (id: string): Promise<IBackendRes<IRole>> => {
    return instance.get(`/api/v1/role/${id}`);
}
/**
Module Permission
 */
export const callCreatePermission = (permission: IPermission): Promise<IBackendRes<IPermission>> => {
    return instance.post('/api/v1/add-permission', { ...permission })
}
export const callUpdatePermission = (permission: IPermission, id: string): Promise<IBackendRes<IPermission>> => {
    return instance.put(`/api/v1/update-permission`, { id, ...permission })
}
export const callDeletePermission = (id: string): Promise<IBackendRes<IPermission>> => {
    return instance.delete(`/api/v1/delete-permission/${id}`);
}
export const callFetchPermission = (query: string): Promise<IBackendRes<IModelPaginate<IPermission>>> => {
    return instance.get(`/api/v1/permissions?${query}`);
}
/**
 * 
Module User
 */
export const callCreateUser = (user: IUser): Promise<IBackendRes<IUser>> => {
    return instance.post('/api/v1/add-user', { ...user })
}

export const callUpdateUser = (user: IUser): Promise<IBackendRes<IUser>> => {
    return instance.put(`/api/v1/update-user`, { ...user })
}

export const callDeleteUser = (id: string): Promise<IBackendRes<IUser>> => {
    return instance.delete(`/api/v1/delete-user/${id}`);
}

export const callFetchUser = (query: string): Promise<IBackendRes<IModelPaginate<IUser>>> => {
    return instance.get(`/api/v1/users?${query}`);
}
/**
 * 
Module Patient
 */
export const callFetchPatient = (query: string): Promise<IBackendRes<IModelPaginate<IPatient>>> => {
    return instance.get(`/api/v1/patients?${query}`);
}
export const callDeletePatient = (id: string): Promise<IBackendRes<IPatient>> => {
    return instance.delete(`/api/v1/delete-patient/${id}`);
}
export const callCreatePatient = (user: IPatient): Promise<IBackendRes<IPatient>> => {
    return instance.post('/api/v1/add-patient', { ...user })
}

export const callUpdatePatient = (user: IPatient): Promise<IBackendRes<IPatient>> => {
    return instance.put(`/api/v1/update-patient`, { ...user })
}
/**
 * 
Module medical Exam
 */
export const callCreateMedicalExam = (md: IMedicalExam): Promise<IBackendRes<IMedicalExam>> => {
    return instance.post(`/api/v1/medical-exams`, { ...md })
}
export const callCreateVitalSign = (vs: IVitalSign): Promise<IBackendRes<IVitalSign>> => {
    return instance.post(`/api/v1/vital-signs`, { ...vs })
}
export const callCreateBloodTest = (bl: IBloodTest): Promise<IBackendRes<IBloodTest>> => {
    return instance.post(`/api/v1/blood-tests`, { ...bl })
}
export const callCreateClinicalInfo = (ci: IClinicalInfo): Promise<IBackendRes<IClinicalInfo>> => {
    return instance.post(`/api/v1/clinical-info`, { ...ci })
}
export const callCreateRadioloy = (ra: IRadiology): Promise<IBackendRes<IRadiology>> => {
    return instance.post(`/api/v1/radiology`, { ...ra })
}
export const callCreateDiagnose = (dig: IDiagnose): Promise<IBackendRes<IDiagnose>> => {
    return instance.post(`/api/v1/diagnose-final`, { ...dig })
}   
