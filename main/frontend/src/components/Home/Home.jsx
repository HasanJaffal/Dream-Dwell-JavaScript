import "./Home.css"
import RoomTypeCardContainer from "../RoomTypeCardContainer/RoomTypeCardContainer"
import MyHeader from "../MyHeader/MyHeader";
import ServicePlanCardContainer from "../ServicePlanCardContainer/ServicePlanCardContainer";
import { useEffect, useState } from "react";
import axios from "axios"

function Home() {
    const [roomTypes, setRoomTypes] = useState([
        {}
    ]);
    const token = localStorage.getItem('token')
    const [servicePlans, setServicePlans] = useState([
        {
            id: 1,
            name: "Service Plan 1",
            description: "Jusutsu Keisen",
            cost: 50,
        },
        {
            id: 2,
            name: "Service Plan 2",
            description: "Jusutsu Keisen",
            cost: 50,
        },
        {
            id: 3,
            name: "Service Plan 3",
            description: "Jusutsu Keisen",
            cost: 50,
        },
        {
            id: 4,
            name: "Service Plan 4",
            description: "Jusutsu Keisen",
            cost: 50,
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/roomtype', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.roomTypes);
                setRoomTypes(response.data.roomTypes);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
        }, []);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/serviceplan', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                          },
                    });
                    console.log('GET request successful:', response.data.plans);
                    setServicePlans(response.data.plans);
                }
                catch (error) {
                    console.error('Error making GET request:', error);
                }
            };
            fetchData();
            }, []);

    return (
        <div>
            <div className="stuff">
                <MyHeader>Room Types 🛋️</MyHeader>
                <RoomTypeCardContainer 
                    data={roomTypes}
                />
            </div>

            <div className="stuff">
                <MyHeader>Service Plans 📋</MyHeader>
                <ServicePlanCardContainer
                    data={servicePlans}
                />
            </div>
        </div>
    )
}

export default Home
