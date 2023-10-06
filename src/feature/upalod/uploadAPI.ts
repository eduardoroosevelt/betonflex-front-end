import axios, { AxiosProgressEvent } from "axios";


export const formdata = (field: string, file: File) => {
  const data = new FormData();

  data.append(field, file);
  data.append("Content-Type", "multipart/form-data");
  return data;
};

export const uploadProgress = (progressEvent: AxiosProgressEvent) => {
  if (progressEvent.total) {
    const progress = (progressEvent.loaded * 100) / progressEvent.total;
    return Math.round(progress * 100) / 100;
  }
  return 0;
};

export const uploadService = (params: {
  field: string;
  file: File;
  endpoint: string;
  token: string
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
  const { field, file, endpoint, onUploadProgress, token } = params;

  const data = formdata('file', file);
  
  return axios.post(`${import.meta.env.VITE_BASE_URL}${endpoint}`, data, { onUploadProgress, headers: { Authorization: `Bearer ${token}` } });
};
