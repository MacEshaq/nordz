import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// this hook component is to signup by sending the request to backend api 'api/user/signup' and get the response back (successful or error).
// if successful then user login and update user property in the 'AutContext.js' which initially equal to null 'user:null'

export function useSignup() {
    const [error, setError] = useState(null)

    // 'isLoading' state is going to be true when we start the request if you want to have loading state or disable state in your button in the form when request is sent.
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useAuthContext()

    const signup = async (username, email, password) => {
        setIsLoading(true)
        setError(null)

        // this is where we are sending the request to backend api with POST method. See 'signupUser controller' in the backend
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })

        // after sending the request to backend, we received back the username & response or error message
        // if successful we receive the username and the token as return from the 'signupUser controller' from the backend
        // if error then we recieve error message as return from the 'signupUser controller' from the backend
        const json = await response.json()

        //the response has the 'ok' property
        //if error or 400 status code then this 'ok' is false
        if (!response.ok) {
            setIsLoading(false)
            // json.error as the return error message from the 'signupUser' controller
            setError(json.error)
        }

        if (response.ok) {
            //save the user to local storage (username and token)
            localStorage.setItem('nordzUser', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)

        }

    }
    return { signup, isLoading, error }
}
