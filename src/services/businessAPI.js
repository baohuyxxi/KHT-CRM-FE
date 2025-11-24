import api from "./api";
import { uploadImages, uploadPDF } from "./uploadAPI";

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
    if (data.stamp && data.stamp?.length > 0) {
        const stampUrls = [];
        const formData = new FormData();
        for (let i = 0; i < data.stamp.length; i++) {
            formData.append('files', data.stamp[i]);
        }
        const res = await uploadImages(formData);
        for (let i = 0; i < res.data.data.length; i++) {
            stampUrls.push(res.data.data[i].url);
        }
        data.stamp = stampUrls;
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
    if (data.stamp && data.stamp?.length > 0) {
        const stampUrls = [];
        const formData = new FormData();
        for (let i = 0; i < data.stamp.length; i++) {
            if (data.stamp[i] instanceof File) {
                formData.append('files', data.stamp[i]);

            } else {
                stampUrls.push(data.stamp[i]);
            }
        }
        if (formData.getAll('files').length > 0) {
            const res = await uploadImages(formData);
            for (let i = 0; i < res.data.data.length; i++) {
                stampUrls.push(res.data.data[i].url);
            }
        }
        data.stamp = stampUrls;
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
