import axios from 'axios';

export const publicClient = axios.create({ timeout: 10000 });

export const privateClient = axios.create({ timeout: 10000 });

