import { atom } from "recoil";

export const searchBarInput = atom({
    key: 'searchBarInput',
    default: ''
})

export const loadingState = atom({
    key: 'loadingState',
    default: false
})