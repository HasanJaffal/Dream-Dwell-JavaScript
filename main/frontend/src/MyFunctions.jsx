// MyFunctions.jsx

import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';

// Function to make a GET request
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to make a POST request
export const postData = async (endpoint, data = {}) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to make a PUT request
export const updateData = async (endpoint, data = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Function to make a DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// Function to make a GET request by ID
export const fetchDataById = async (endpoint, id, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data with ID ${id}:`, error);
    throw error;
  }
};

// Function to make a PUT request by ID
export const updateDataById = async (endpoint, id, data = {}) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating data with ID ${id}:`, error);
    throw error;
  }
};

// Function to make a DELETE request by ID
export const deleteDataById = async (endpoint, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data with ID ${id}:`, error);
    throw error;
  }
};
