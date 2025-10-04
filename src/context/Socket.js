import { io } from 'socket.io-client';
import { BASE_URL } from '../lib/config';

const SOCKET_URL = BASE_URL 

const socket = io(SOCKET_URL, {
  withCredentials: true, 
  autoConnect: true,
});

export default socket;