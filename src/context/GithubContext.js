import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = ({
        users: [],
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
            fetchUsers,
            searchUsers,
            clearUsers,
        }}>
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext;