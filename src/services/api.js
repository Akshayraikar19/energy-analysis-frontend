import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

export const getDesigns = async () => axios.get(`${API_URL}/designs`);
export const getDesignById = async (id) => axios.get(`${API_URL}/designs/${id}`);
export const createDesign = async (data) => axios.post(`${API_URL}/designs`, data);
export const updateDesign = async (id, data) => axios.put(`${API_URL}/designs/${id}`, data);
export const deleteDesign = async (id) => axios.delete(`${API_URL}/designs/${id}`);
export const calculateHeatGain = async (data) => axios.post(`${API_URL}/analysis/calculate`, data);
export const compareDesigns = async () => axios.get(`${API_URL}/analysis/compare`);

export const getCityRankings = async (A, SHGC) => {
    return axios.get(`${API_URL}/analysis/cities`, {
      params: { A, SHGC }
    });
  };
  
