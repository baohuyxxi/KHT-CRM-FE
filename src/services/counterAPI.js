import api from "./api";

export const getCounterInvoice = () => {
    return api.get('/customers/invoices/get-code');
}

export const saveInvoice = (cusId, invoicePayload) => {
    console.log("with payload:", invoicePayload);
    return api.post(`/customers/invoices/${cusId}/${invoicePayload.invoiceCode}`, invoicePayload);
}

export const removeInvoice = (cusId, invoiceCode) => {
    return api.delete(`/customers/invoices/${cusId}/${invoiceCode}`);
}