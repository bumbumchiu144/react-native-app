import axios from "axios";
import { baseURL, headers, checkIpURL } from "../constants/apiHelper";
import { jwtDecode, jwtEncode } from "../utils/utils";
import publicIP from 'react-native-public-ip';
import { isVietnameseIp } from '../utils/ipChecker';

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: headers,
});

export const fetchIp = async () => {
  try {
    const ip = await publicIP();
    return isVietnameseIp(ip);
  } catch (error) {
    console.error('Error fetching IP:', error);
    return false;
  }
};

export const getAppConfig = async () => {
  const payload = {
    app_id: 3,
  };
  const dataObj = { data: jwtEncode(JSON.stringify(payload)) };

  try {
    const response = await instance.post("get-app-config", dataObj);
    const tempObj = JSON.parse(jwtDecode(response.data.data));
    return tempObj.is_private === 1 ? 'no' : 'yes';
  } catch (error) {
    if (error.response) {
      console.log("Error response:", error.response);
    } else if (error.request) {
      console.log("Error request:", error.request);
    } else {
      console.log("Error message:", error.message);
    }
    return 'no';
  }
};
