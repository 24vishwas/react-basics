import {  postData } from './api';

const BASE_URL = 'https://dummy.restapiexample.com/api/v1/create';

export const createUser = async (formData) => {
    return postData(BASE_URL, formData);
};