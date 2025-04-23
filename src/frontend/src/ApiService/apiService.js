import axiosInstance from "./axiosInstance";

export const getData = async (url) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (url, data, customHeaders) => {
  console.log(customHeaders);
  try {
    const response = await axiosInstance.post(url, data, customHeaders);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
