import styled from 'styled-components';
import './LoginPage.css'; // Import the CSS file for non-dynamic styles
import MySwitch from '../../components/MySwitch/MySwitch';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProvider from '../../MyProvider';

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

const ImageContainer = styled.div`
    flex: 1;
    overflow: hidden;
`;

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Add any other styles you want for the background image */
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

const RememberMe = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: ${colors.dodgerblue};
`;

const LoginPage = () => {
    const [user, updateUser] = useState(JSON.parse(localStorage.getItem('userData')));
    console.log("Current User: ", user);

    // const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    // const openSignUpModal = () => setSignUpModalOpen(true);
    // const closeSignUpModal = () => setSignUpModalOpen(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        // Add additional signup fields if needed
    });

    const [error , setError ] = useState(false)
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(false)
    try {
        setLoading(true);
        const { data } = await axios.post('http://localhost:4000/api/auth/signin', formData);
        
        const {token} =data;

        const authToken = token;

        localStorage.setItem('token', authToken);
  
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify(data.rest));
        
        // Log the stored data for verification
        const storedData = JSON.parse(localStorage.getItem('userData'));
  
        updateUser(data.rest);
        setError(null);
        if(storedData.role =='admin')
           navigate('/admin')
        else navigate('/');

    } catch (error) {
        setError(error.response.data.message);
    } finally {
        setLoading(false);
        setFormData({
            username: '',
            password: '',
        });
    }
};

    return (
        <MyProvider className="bg-blue-500">
        <LoginPageContainer className="login-page">
            <ImageContainer className="image-container">
                <BackgroundImage
                    src="/public/room2.jpg"
                    alt="Background"
                    className="background-image"
                />
            </ImageContainer>
            <LoginFormWrapper className="login-form-container">
                <img src="public\logo.png" className='logo' />
                <FormContainer>
                    <h1 style={{color: "dodgerblue", fontFamily: "revert-layer", marginBottom: "20px"}}>Login</h1>
                    <Form onSubmit={handleLoginSubmit}>
                        <InputLabel>
                            <Input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                        </InputLabel>
                        <InputLabel>
                            <Input type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
                        </InputLabel>
                        <SubmitButton type="submit" disabled={loading} >{loading ? 'Loading...' : 'Sign in'}</SubmitButton>
                        {error && <p className='text-red-500'>{error}</p>}

                        <div >
                            <div>
                                <RememberMe>
                                    <MySwitch />
                                    <span style={{marginLeft: "0px", fontWeight: "bold", fontSize: "14px"}}>Remember Me</span>
                                </RememberMe>
                                <div className="flex gap-2 mt-5">
                                <p>Dont have an account?</p>
                                    <Link to={"/sign-up"}>
                                    <span className="text-blue-700 hover:underline">Sign up</span>
                                    </Link>
                                </div>
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
