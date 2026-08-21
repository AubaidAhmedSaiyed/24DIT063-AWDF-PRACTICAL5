import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function signup() {
    axios.post('http://localhost:5000/signup', { username: username, password: password })
      .then(function () {
        setMessage('Signup done, now login');
      });
  }

  function login() {
    axios.post('http://localhost:5000/login', { username: username, password: password })
      .then(function (res) {
        if (res.data.success) {
          setMessage('Login success!');
        } else {
          setMessage('Wrong username or password');
        }
      });
  }

  return (
    <div>
      <h2>Login / Signup</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={function (e) { setUsername(e.target.value); }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={function (e) { setPassword(e.target.value); }}
      />
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default Login;