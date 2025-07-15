import axiosInstance from '../api/axiosInstance';

export const getAnalytics = async () => {
  const response = await axiosInstance.get('/analytics');
  return response.data;
};