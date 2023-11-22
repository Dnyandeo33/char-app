import axios from "axios";
export const postRequest = async (url, userInfo) => {
    const response = await axios.post(url, userInfo);
    const data = await response.data;
    console.log(data);
    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }
    return data;
}