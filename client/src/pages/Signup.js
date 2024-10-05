import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

export default function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        //when button i click then usersignup hook fires off
        await signup(username, email, password)
        // console.log(username, email, password)
    }


    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>User Name:</label>
            <input type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Email:</label>
            <input type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading} id='signup-btn'>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
