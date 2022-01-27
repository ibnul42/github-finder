import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = ({
        users: [],
        user: {},
        repos: [],
        loading: false,
    })

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get initial users
    const fetchUsers = async () => {
        setLoading();
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            // },
        });

        const data = await res.json();
        dispatch({
            type: 'GET_USERS',
            payload: data,
        })

    }

    // Get serach users
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        })
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            // },
        });

        const { items } = await res.json();
        dispatch({
            type: 'GET_USERS',
            payload: items,
        })

    }

    // Get single user
    const getUser = async (login) => {
        setLoading();

        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            // },
        });

        const repoRes = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`, {
            // headers: {
            //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            // },
        });



        if(res.status === 404){
            window.location = '/notfound'
        } else {
            const data = await res.json();
            const repos = await repoRes.json();
            dispatch({
                type: 'GET_USER',
                payload: {data, repos},
            })
        }       

    }

    // Clear users
    const clearUsers = () => {
        setLoading();
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    // Set Loading
    const setLoading = () => dispatch({ type: 'SET_LOADING' });

    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            fetchUsers,
            searchUsers,
            clearUsers,
            getUser
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;