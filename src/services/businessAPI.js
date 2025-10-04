import api from "./api";
import { uploadPDF } from "./uploadAPI";

export const createBusiness = async (data) => {
    if (data.licenseFile) {
        //Lấy ngày giờ làm tên file
        const timestamp = Date.now();
        const fileName = `GPKD_${timestamp}`;
        const formData = new FormData();
        formData.append('file', data.licenseFile);
        formData.append('fileName', fileName);

        const res = await uploadPDF(formData);
        data.licenseFile = res.data.data.url;
    }
    return api.post('/businesses/add', data);
}

export const getAllBusinesses = () => {
    return api.get('/businesses');
}

export const getBusinessById = (id) => {
    return api.get(`/businesses/${id}`);
}

export const updateBusiness = async (id, data) => {
    if (data.licenseFile && data.licenseFile instanceof File) {
        //Lấy ngày giờ làm tên file
        const timestamp = Date.now();
        const fileName = `GPKD_${timestamp}`;
        const formData = new FormData();
        formData.append('file', data.licenseFile);
        formData.append('fileName', fileName);

        const res = await uploadPDF(formData);
        data.licenseFile = res.data.data.url;
    }
    return api.put(`/businesses/update/${id}`, data);
}


export const deleteLinkedBusinesses = (cusId) => {
    return api.delete(`/businesses/unlink-customer/${cusId}`);
}

export const deleteBusiness = (id) => {
    return api.delete(`/businesses/delete/${id}`);
}

export const linkCustomerToBusiness = (busId, cusId) => {
    return api.put(`/businesses/link-customer/${busId}`, { cusId });
}
