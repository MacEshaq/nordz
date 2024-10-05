import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>User Name:</label>
            <input type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button id='login-btn' disabled={isLoading}>Login</button>
            {error && <div>{error}</div>}
            <p>Macsalik123!</p>
        </form>
    )
}