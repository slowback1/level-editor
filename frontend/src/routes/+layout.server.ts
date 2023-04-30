import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { loadFromCookie, userDataStore } from "../stores/userDataStore";

export function load(request) {
    loadFromCookie(request.cookies);
    const isRoot = request.url.pathname === "/";

    const userData = get(userDataStore);

    if (!userData)
        throw redirect(300, "/login");

    if (isRoot)
        throw redirect(300, "/app");
}