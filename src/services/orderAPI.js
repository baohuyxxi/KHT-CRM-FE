import api from './api';

export const createOrder = (orderData) => {
    return api.post('/orders/add', orderData);
}

export const getOrders = () => {
    return api.get('/orders');
}
