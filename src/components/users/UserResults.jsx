import React, { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { fetchUsers } from '../../context/github/GithubActions';

function UserResults() {
    const { users, loading, dispatch } = useContext(GithubContext);

    useEffect(() => {
        dispatch({type: 'SET_LOADING'})
        const getUserData = async () => {
            const userData = await fetchUsers();
            dispatch({
                type: "GET_USERS",
                payload: userData
            })
        }
        getUserData();
    }, [dispatch])

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

export default UserResults;
