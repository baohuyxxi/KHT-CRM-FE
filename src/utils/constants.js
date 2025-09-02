export const generateSlug = (str) => {
    return str
        .toLowerCase()
        .replace(/đ/g, "d") 
        .replace(/Đ/g, "D")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};