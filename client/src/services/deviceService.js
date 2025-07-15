import axiosInstance from '../api/axiosInstance';

export const getDevices = async () => {
  const response = await axiosInstance.get('/devices');
  return response.data;
};
