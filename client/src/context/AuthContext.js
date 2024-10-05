import { createContext, useReducer, useEffect } from 'react';

// global authContext
export const AuthContext = createContext();


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default: return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // 'useEffect' runs once from the first load of the app
    // getting the 'nordzUser' from the localStorage which has 2 properties ("username and token")
    useEffect(() => {
        // if 'nordzUser' exists then assigned it toe 'user' else 'user' is null.
        const user = JSON.parse(localStorage.getItem('nordzUser'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }

    }, [])

    console.log('AuthContext state: ', state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}