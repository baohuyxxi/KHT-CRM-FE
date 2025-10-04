import api from './api';

export const createOrder = (orderData) => {
    return api.post('/orders/add', orderData);
}

export const updateOrder = (id, orderData) => {
    return api.put(`/orders/update/${id}`, orderData);
}

export const getOrders = (type, page, limit) => {
    return api.get(`/orders?type=${type}&page=${page}&limit=${limit}`);
}

export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
}

export const extendOrder = (id, data) => {
    return api.post(`/orders/extend/${id}`, data);
}

export const getOrdersByCustomerId = (id, page, limit) => {
    return api.get(`/orders/customer/${id}?page=${page}&limit=${limit}`);
}

export const filterOrders = (filters) => {
    const query = new URLSearchParams({ ...filters }).toString();
    return api.get(`/orders/filter/search?${query}`);
}