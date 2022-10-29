import React from 'react'

export default function Register({handleRegister, username, setUsername, password, setPassword, handleClose}) {
    console.log(`username is ${username}`)
  return (
    <div className="register-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input
            type="text" 
            name="username" 
            id="username" 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required 
            />
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={({ target }) => setPassword(target.value)}
            required 
            />
            <button type="submit" value="Register">Submit</button>
        </form>
        <script>

        </script>
    </div>
  )
}

