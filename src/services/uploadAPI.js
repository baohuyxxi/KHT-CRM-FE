import api from "./api";


export const uploadImage = (data) => {
    return api.post('/image/upload', data);
}

export const uploadPDF = (data) => {
    return api.post('/pdf/upload', data);
}