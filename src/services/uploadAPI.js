import api from "./api";


export const uploadImage = (data) => {
    return api.post('/image/upload', data);
}

export const uploadImages = (data) => {
    return api.post('/image/uploads', data);
}

export const uploadPDF = (data) => {
    return api.post('/pdf/upload', data);
}

export const uploadPDFs = (data) => {
    return api.post('/pdf/uploads', data);
}