import React from "react";

export default function Login({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  handleClose,
}) {
  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" value="Log In">
          Login
        </button>
      </form>
    </div>
  );
}
