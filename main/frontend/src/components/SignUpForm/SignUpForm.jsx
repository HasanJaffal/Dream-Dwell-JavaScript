    // SignUpForm.js
    /* eslint-disable react/prop-types */
    import { useEffect, useState } from 'react';
    import './SignUpForm.css';
    import Modal from 'react-modal';
import UserContext from '../../UserContext';

    const SignUpForm = ({ isOpen, onClose }) => {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: ''
        });


        useEffect(() => {
            if (!isOpen) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    address: ''
                });
            }
        }, [isOpen]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();

//////////////////////////////////////////////////////////////////
            console.log("User Context: ", UserContext);

            console.log('Form submitted:', formData);
            onClose();
        };

        return (
            isOpen &&
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Sign Up Form"
            >
                <center><h1 style={{color: "dodgerblue", fontFamily: "revert-layer"}}>Sign Up</h1></center>
                <div className="sign-up-form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button type="submit" className="sign-up-button">
                            Sign Up
                        </button>
                        
                    </form>
                </div>
            </Modal>
        );
    };

    export default SignUpForm;
