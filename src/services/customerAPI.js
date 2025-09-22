import api from "./api";

export const createCustomer = (data) => {
    return api.post('/customers/add', data);
}

export const updateCustomer = (id, data) => {
    return api.put(`/customers/update/${id}`, data);
}

export const getCustomers = (type, page, limit) => {
    return api.get(`/customers?type=${type}&page=${page}&limit=${limit}`);
}

export const getCustomerById = (id) => {
    return api.get(`/customers/${id}`);
}

