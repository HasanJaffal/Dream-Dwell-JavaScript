/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import MySwitch from '../MySwitch/MySwitch';
import MyButton from '../MyButton/MyButton';
import './LoginForm.css';

const LoginForm = () => {
    const [isGuestLogin, setGuestLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    const handleSwitchChange = (checked) => {
        setGuestLogin(checked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleLogin = () => {
        // Add your login logic here
        console.log('Login Data:', loginData);
    };

    const handleCreateAccountClick = () => {
        console.log("Create account link clicked!");
        // Perform actions related to creating an account (e.g., navigate to a signup page)
    };

    return (
        <div className="login-form-container">
        <h2>Login</h2>
        <MySwitch
            label="Admin Login"
            onChange={handleSwitchChange}
            checked={isGuestLogin}
        />
        <form className="login-form">
            <label htmlFor="usernameOrEmail">Username or Email:</label>
            <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={loginData.usernameOrEmail}
            onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            />
            <MyButton label="Login" onClick={handleLogin} />
            <div className="create-account-link">
            <Link to="/signup" onClick={handleCreateAccountClick}>
                Don't have an account? Create one.
            </Link>
            </div>
        </form>
        </div>
    );
};

export default LoginForm;
