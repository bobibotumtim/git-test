import axios from "axios";

const API_URL = "http://localhost:9000/courses";

export const fetchCoursesAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchCourseByIdAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addCoursesAPI = async (newCourse) => {
  const response = await axios.post(API_URL, newCourse);
  return response.data;
};

export const updateCoursesAPI = async (id, updatedCourse) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCourse);
  return response.data;
};

export const deleteCoursesAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
