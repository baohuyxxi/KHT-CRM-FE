import api from './api';

export const createOrder = (orderData) => {
    return api.post('/orders/add', orderData);
}

export const updateOrder = (id, orderData) => {
    return api.put(`/orders/update/${id}`, orderData);
}

export const getOrders = () => {
    return api.get('/orders');
}

export const getOrderById = (id) => {
    return api.get(`/orders/${id}`);
}