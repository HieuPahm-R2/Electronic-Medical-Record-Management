export const ALL_PERMISSIONS = {
    PATIENTS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/patients', module: "PATIENTS" },
        CREATE: { method: "POST", apiPath: '/api/v1/add-patient', module: "PATIENTS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/upadte-patient', module: "PATIENTS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/delete-patient/{id}', module: "PATIENTS" },
    },
    PERMISSIONS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/permissions', module: "PERMISSIONS" },
        CREATE: { method: "POST", apiPath: '/api/v1/add-permission', module: "PERMISSIONS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/update-permission', module: "PERMISSIONS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/delete-permission/{id}', module: "PERMISSIONS" },
    },
    ROLES: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/roles', module: "ROLES" },
        CREATE: { method: "POST", apiPath: '/api/v1/add-role', module: "ROLES" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/update-role', module: "ROLES" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/delete-role/{id}', module: "ROLES" },
    },
    USERS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/v1/users', module: "USERS" },
        CREATE: { method: "POST", apiPath: '/api/v1/add-user', module: "USERS" },
        UPDATE: { method: "PUT", apiPath: '/api/v1/update-user', module: "USERS" },
        DELETE: { method: "DELETE", apiPath: '/api/v1/delete-user/{id}', module: "USERS" },
    },
}