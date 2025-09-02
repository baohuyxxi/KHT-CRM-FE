import { uploadImage } from "~/services/adminAPI";

// Chuyển base64/blob URL thành File
export async function base64ToFile(base64, filename) {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

// Xử lý content để upload ảnh base64/blob lên server
export async function handleContent(content) {
  if (!content) return content;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const images = doc.querySelectorAll("img");

  for (let img of images) {
    const src = img.getAttribute("src");

    if (src && (src.startsWith("data:") || src.startsWith("blob:"))) {
      try {
        const file = await base64ToFile(src, "image.png");
        const data = await uploadImage(file);
        img.setAttribute("src", data.url);
      } catch (err) {
        console.error("Upload image error:", err);
      }
    }
  }

  return doc.body.innerHTML;
}
