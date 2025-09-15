import api from "./api";

export const createCustomer = (data) => {
    return api.post('/customers', data);
}

export const getCustomers = () => {
    return api.get('/customers');
}

export const getCustomerById = (id) => {
    return api.get(`/customers/${id}`);
}

