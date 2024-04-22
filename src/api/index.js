import axios from "axios";

// const LOCAL_BASE_URL = "http://pg.demoquaeretech.in/api/";

const LOCAL_BASE_URL = "http://192.168.23.6:9000/api/";

const LOCAL_BASE = "http://192.168.23.44:9000/api/";

const userToken = localStorage.getItem("accessToken");
const token = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + `${userToken}`,
  },
};
export const getLoginAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE_URL}login`, data);
}
export const getDashboardAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}dashboard`, data, token)
}
export const getUserListAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}users-list`, data, token)
}
//Department 
export const createDepartmentAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}create-department`, data, token)
}
export const getDepartmentListAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}department-list`, data, token)
}
export const editDepartmentAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}update-department`, data, token)
}
export const deleteDepartmentAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}delete-department`, data, token)
}

//Designation
export const getDesignationListAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}designation-list`, data, token)
}
export const getHODListAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}headDepartment-list`, data, token)
}

export const getDesignationListByDepartmentAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}get-departmentByDesignation`, data, token);
};
//hod
export const getHODListByDesignationAPI = async (data, token) => {
  return await axios.post(`${LOCAL_BASE_URL}get-hodByDesignation`, data, token);
};
//tower
export const getTowerListAPI=async (data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}tower-list`,data,token)
}
//room 
export const getRoomListAPI=async (data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}room-list`,data,token)
}
export const getFloorListByTowerAPI=async (data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}get-floor-list`,data,token)
}

//charge type
export const getChargeListAPI=async (data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}unit-charge-list`,data,token)
}
export const getUnitChargeListAPI=async (data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}charge-type-list`,data,token)
}

//House ALLOTE

export const getHoustListAPI=async(data,token)=>{
  return await axios.post(`${LOCAL_BASE_URL}allot-house-list`,data,token)
}











//login
export const GetloginAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE}login`, data)
}

//Department Api

export const CreateDepartmentAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE}add-department`, data, token)
};
export const GetDepartmentListAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE}get-department`, data, token)
};

export const DeleteDepartmentAPI = async (data) => {
  return await axios.post(`${LOCAL_BASE}delete-department`, data, token)
};