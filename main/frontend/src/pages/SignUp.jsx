import styled from 'styled-components';
import '../pages/LoginPage/LoginPage'; // Import the CSS file for non-dynamic styles
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProvider from '../MyProvider';

// Define colors
const colors = {
    black: '#000',
    white: '#fff',
    dodgerblue: '#1e90ff',
    whitesmoke: '#f5f5f5',
};

// Styled components for dynamic styles
const LoginPageContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
`;
const LoginFormWrapper = styled.div`
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.dodgerblue}; /* Container background color */
`;

const FormContainer = styled.div`
    background-color: ${colors.white};
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    text-align: center; /* Center the text within the FormContainer */
`;

const Form = styled.form`
    width: 100%;
`;

const InputLabel = styled.label`
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    width: 100%;
    color: ${colors.black};
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid ${colors.black};
    border-radius: 4px;
    box-sizing: border-box;
    background-color: ${colors.whitesmoke};
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    background-color: ${colors.dodgerblue};
    margin-bottom: 20px;
    font-weight: bold;
    color: black;
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover {
        color: ${colors.whitesmoke};
    }
`;



const LoginPage = () => {

    // const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    // const openSignUpModal = () => setSignUpModalOpen(true);
    // const closeSignUpModal = () => setSignUpModalOpen(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''

        // Add additional signup fields if needed
    });

    const [error , setError ] = useState(false)
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/signUp',formData);
      console.log(data, formData)
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
    setFormData({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: ''
    });
};


    return (
        <MyProvider className="bg-blue-500">
        <LoginPageContainer className="login">
            <LoginFormWrapper className="login-form-container">
                <FormContainer>
                    <h1 style={{color: "dodgerblue", fontFamily: "revert-layer", marginBottom: "20px"}} className='text-xl'>Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <InputLabel className='flex gap-5'>
                            <Input type="text" name="firstName" placeholder="First name" onChange={handleInputChange} />
                            <Input type="text" name="lastName" placeholder="Last name" onChange={handleInputChange} />
                        </InputLabel>
                        <InputLabel className='flex gap-5'>
                            <Input type="text" name="userName" placeholder="Username" onChange={handleInputChange} />
                            <Input type="text" name="email" placeholder="Email" onChange={handleInputChange}/>
                        </InputLabel>
                        <InputLabel className='flex gap-5'>
                            <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                            <Input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange}/>
                        </InputLabel>
                            <Input type="text" name="address" placeholder="Address" onChange={handleInputChange} />
                        <SubmitButton type="submit" className='text-white' disabled={loading} >{loading ? 'Loading...' : 'Sign Up'}</SubmitButton>
                        {error && <p className='text-red-500'>{error}</p>}

                        <div >
                                <div className="flex gap-2 mt-5">
                                <p>Dont have an account?</p>
                                    <Link to={"/sign-in"}>
                                    <span className="text-blue-700 hover:underline">Sign in</span>
                                    </Link>
                                </div>
                         
                        </div>
                               
                    </Form>
                </FormContainer>
            </LoginFormWrapper>
        </LoginPageContainer>
        </MyProvider>
    );
};

export default LoginPage;
