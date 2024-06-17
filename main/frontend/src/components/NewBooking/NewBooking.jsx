import { useState, useEffect } from 'react';
import './NewBooking.css';
import axios from 'axios';

const NewBooking = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [servicePlans, setServicePlans] = useState([]);
    const [formData, setFormData] = useState({
        servicePlanId: 1,
        roomTypeId: 1,
        checkInDate: '',
        checkOutDate: '',
        status: 'booked'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const roomTypesResponse = await axios.get('http://localhost:4000/api/roomtype', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                setRoomTypes(roomTypesResponse.data.roomTypes);
                console.log('GET roomTypes successful:', roomTypesResponse.data.roomTypes);
                

                const servicePlansResponse = await axios.get('http://localhost:4000/api/serviceplan', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                setServicePlans(servicePlansResponse.data.plans);
                console.log('GET servicePlans successful:', servicePlansResponse.data.plans);
                
            } catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(formData)
    };

    const user = JSON.parse(localStorage.getItem('userData'));
    console.log("Current User: ", user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRowData = {
            userId: user["_id"],
            roomTypeId: formData.roomTypeId, // Ensure this matches the state key
            servicePlanId: formData.servicePlanId,
            checkInDate: formData.checkInDate,
            checkOutDate: formData.checkOutDate,
            status: "booked"
        };

        try {
            console.log("newRowData: ", newRowData);
            const token = localStorage.getItem('token')
  
            const response = await axios.post('http://localhost:4000/api/booking', newRowData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                  },
            });
            console.log('POST request successful:', response.data.booking);
        } catch (error) {
            console.error('Error making POST request:', error);
            window.alert("There is no available room of the chosen type at this date range :(")
        }

        // Clear the form after submitting
        setFormData({
            servicePlanId: 0,
            roomTypeId: 0, // Ensure this matches the state key
            checkInDate: '',
            checkOutDate: '',
            status: "booked"
        });
    };

    return (
       
            <div className=" mx-auto border max-w-max mt-24 scroll-m-0">
                <form onSubmit={handleSubmit} className="form">
                    <label>
                        Service Plan:
                        <select
                            name="servicePlanId"
                            value={formData.servicePlanId}
                            onChange={handleInputChange}
                        >
                            {servicePlans.map((sp, index) => (
                                <option key={index} value={sp._id}>
                                    {sp.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Room Type:
                        <select
                            name="roomTypeId"
                            value={formData.roomTypeId}
                            onChange={handleInputChange}
                        >
                            {roomTypes.map((rt, index) => (
                                <option key={index} value={rt._id}>
                                    {rt.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Check-in Date:
                        <input
                            type="date"
                            name="checkInDate"
                            value={formData.checkInDate}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Check-out Date:
                        <input
                            type="date"
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit" className="button">
                        Book now!
                    </button>
                </form>
            </div>
        
    );
};

export default NewBooking;
