import axios from "axios";
import { BASE_LIVE_URL, BASE_LOCAL_URL } from "./endPoints";
//set a base url for localhost and heurko than export the axios
import mime from "mime";



// const http = axios.create({
//     baseURL: BASE_LIVE_URL,
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
// });

// export default http;

const createFormData = (photo) => {
    const data = new FormData();
    const uriParts = photo.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    data.append('file', {
        name: photo.name || photo.uri.split('/').pop(),
        type: `image/${fileType}`,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    return data;
};


export const uploadImage = async (file) => {
    const formData = createFormData(file);
    console.log("uploading...", formData);
    const config = {
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        //upload using fetchAPI
        const response = await fetch(`${BASE_LIVE_URL}/predict`, {
            method: 'POST',
            body: formData,
            ...config
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        alert("Error while uploading the image")
        return false
    }
    //fecth is better than axios cause it worked for me
}