import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
    baseURL: GITHUB_URL,
    // headers: {
    //     Authorization: `token ${GITHUB_URL}`,
    // },
})

// Get initial users
export const fetchUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
        // headers: {
        //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        // },
    });

    const data = await res.json();
    return data
}

// Get serach users
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const res = await github.get(`/search/users?${params}`);
    return res.data.items;
}

// Get single user
export const getUser = async (login) => {

    const res = await github.get(`/users/${login}`);
    const repoRes = await github.get(`/users/${login}/repos`);

    return { data: res.data, repos: repoRes.data };
}