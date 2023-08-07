import React from 'react'
import axios from "axios";
import { Product } from '../models/Product';

const config = axios.create({
    baseURL: 'http://localhost:8090/',
    timeout: 15000
})

export const allProduct = () => {
    return config.get<Product>('product/alllist')
}
