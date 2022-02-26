import axios from "axios";
import { BASE_LIVE_URL, BASE_LOCAL_URL } from "./endPoints";
import * as ImageManipulator from 'expo-image-manipulator';



const http = axios.create({
    baseURL: BASE_LIVE_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export default http;

//this used to resize image
const resizeImage = async (image) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        image.localUri || image.uri,
        [{ resize: { width: image.width * 0.5, height: image.height * 0.5 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
}

// creating the form data with rezized images
const createFormData = async (photo) => {
    const data = new FormData();
    const resizedPhoto = await resizeImage(photo);
    const uriParts = resizedPhoto.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    console.log("uploading the image : ", resizedPhoto);
    data.append('file', {
        name: resizedPhoto.name || resizedPhoto.uri.split('/').pop(),
        type: `image/${fileType}`,
        uri: Platform.OS === 'ios' ? resizedPhoto.uri.replace('file://', '') : resizedPhoto.uri,
    });
    return data;
};


export const uploadImage = async (file) => {
    const formData = await createFormData(file);
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