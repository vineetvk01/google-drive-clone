import socketIOClient from "socket.io-client";
import { baseUrl } from '../constants';

const allChatSocketConnection = socketIOClient(baseUrl+'/chats');
const dmChatServicesConnection = socketIOClient(baseUrl+'/chat/user');

export const allChatSocket = () => allChatSocketConnection;
export const dmChatSocket = () => dmChatServicesConnection;
