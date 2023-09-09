import {atom} from 'jotai'
import { Socket } from 'socket.io-client';
import { io } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export const userNameAtom = atom('');
export const isLoginAtom = atom(false);
export const idAtom = atom('');
export const socketAtom = atom<Socket<DefaultEventsMap, DefaultEventsMap>>(io('http://localhost:8080'));
export const usersAtom = atom<{[key: string]: string}>({});
export const selectedUsersAtom = atom<string>('');

export const selectedUserAtomDerived = atom<string>(
    get => get(usersAtom)[get(selectedUsersAtom)],
);

export const messagesAtom = atom<{ id: string, message: string }[]>([]);