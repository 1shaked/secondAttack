import {atom} from 'jotai'
import { Socket } from 'socket.io-client';
import { io } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const userNameAtom = atom('');
export const isLoginAtom = atom(false);
export const idAtom = atom('');
const wsUri = window.location.protocol === 'https:' ? 'wss://' + window.location.host : 'ws://' + window.location.host;

export const socketAtom = atom<Socket<DefaultEventsMap, DefaultEventsMap>>(io(wsUri));
export const usersAtom = atom<{[key: string]: string}>({});
export const selectedUsersAtom = atom<string>('');

export const selectedUserAtomDerived = atom<string>(
    get => get(usersAtom)[get(selectedUsersAtom)],
);

export const messagesAtom = atom<{ id: string, message: string }[]>([]);