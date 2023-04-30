import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { loadFromCookie, userDataStore } from "../../stores/userDataStore";




export function load(something) {
    loadFromCookie(something.cookies);

    const userData = get(userDataStore);

    if (!userData)
        throw redirect(300, "/login");
}