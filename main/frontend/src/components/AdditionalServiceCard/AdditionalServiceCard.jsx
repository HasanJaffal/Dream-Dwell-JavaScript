/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './AdditionalServiceCard.css';
import axios from 'axios';
import MyButton from "../MyButton/MyButton";

const AdditionalServiceCard = ({ image, name, description, cost, _id }) => {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log("USER DATA: ", user)
    const [bookings, setBookings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        bookingId: '',
        additionalServiceId: '',
        count: '',
    });
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/booking`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                console.log('GET request successful:', response.data.booking);
                
                // Filter the data where userId is equal to user._id
                const filteredData = response.data.booking.filter(item => item.userId === user["_id"] && item.status !== 'canceled');
                console.log("userId: ", user["_id"])
                setBookings(filteredData);
                console.log("MY BOOKINGS: ", filteredData)
            } catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
        // Send data to the server
        const res = await axios.post('http://localhost:4000/api/requests', {
            bookingId: formData.bookingId,
            additionalServiceId: _id,
            count: formData.count,
        });
        console.log("REQUEST: ", res);

        // Reset form data and hide the form
        setFormData({
            bookingId: '',
            additionalServiceId: '',
            count: '',
        });
        setShowForm(false);
        } catch (error) {
        console.error('Error submitting form:', error);
        }
    };

    function handleCancel() {
        setShowForm(false);
    }

    return (
        <div className="card" onClick={handleClick}>
            <img src={image} alt="IMAGE" className="image" />
            {showForm ? (
                <center>
                <form style={{ width: "80%", margin: "2%" }}>
                    {bookings.map((booking, index) => (
                        <label key={index} >
                            <span>Booking of ID {booking._id}</span>
                            <input
                                type="radio"
                                name="bookingId"
                                value={booking._id}
                                onChange={handleInputChange}
                            />
                        </label>
                    ))}
                    <input name="count" placeholder="Count" onChange={handleInputChange} />
                    <MyButton onClick={handleFormSubmit} label="Submit" />
                    <MyButton onClick={handleCancel} label="Cancel" />
                </form>
                </center>
            ) : (
                <>
                <div className="content">
                    <h2 className="name">{name}</h2>
                    <p className="description">{description}</p>
                    <p className="cost">${cost}</p>
                </div>
                </>
            )}
        </div>
    );
};

export default AdditionalServiceCard;
