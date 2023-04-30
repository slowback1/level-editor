import { writable } from "svelte/store";
import type { LoginResponse } from "../api/dataFetchers/userDataFetcher";

export interface UserData {
    token: string;
    username: string;
    userId: number;
}

const cookieKeys = {
    token: "token",
    username: "username",
    userId: "userId"
}


export const userDataStore = writable<UserData>(null);

export const loadUserResponse = (response: LoginResponse) => {
    userDataStore.set({
        token: response.Authorization,
        userId: response.data.id,
        username: response.data.name
    })


    setCookie(cookieKeys.token, response.Authorization);
    setCookie(cookieKeys.userId, response.data.id.toString());
    setCookie(cookieKeys.username, response.data.name);
}

const setCookie = (name: string, value: string) => {
    const encoded = encodeURIComponent(value);

    document.cookie = `${name}=${encoded}`;
}

export const loadFromCookie = (cookies) => {
    const token = cookies.get(cookieKeys.token);
    const username = cookies.get(cookieKeys.username);
    const userId = cookies.get(cookieKeys.userId);

    if (token && username && userId)
        userDataStore.set({ token, username, userId: Number(userId) });
}