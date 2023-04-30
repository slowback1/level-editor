import { writable } from "svelte/store";
import type { LoginResponse } from "../api/dataFetchers/userDataFetcher";

export interface UserData {
    token: string;
    username: string;
    userId: number;
}

export const userDataStore = writable<UserData>(null);

export const loadUserResponse = (response: LoginResponse) => {
    userDataStore.set({
        token: response.Authorization,
        userId: response.data.id,
        username: response.data.name
    })
}