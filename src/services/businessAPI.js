import api from "./api";
import { uploadPDF } from "./uploadAPI";

export const createBusiness = async (data) => {
    //Lấy ngày giờ làm tên file
    const timestamp = Date.now();
    const fileName = `GPKD_${timestamp}`;
    const formData = new FormData();
    formData.append('file', data.licenseFile);
    formData.append('fileName', fileName);

    const res = await uploadPDF(formData);
    data.licenseFile = res.data.data.url;
    return api.post('/businesses/add', data);
}

export const getAllBusinesses = () => {
    return api.get('/businesses');
}

export const getBusinessById = (id) => {
    return api.get(`/businesses/${id}`);
}

export const updateBusiness = (id, data) => {
    return;
    return api.put(`/businesses/${id}`, data);
}

