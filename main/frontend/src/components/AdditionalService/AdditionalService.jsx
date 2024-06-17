import { useEffect, useState } from "react";
import AdditionalServiceCardContainer from "../AdditionalServiceCardContainer/AdditionalServiceCardContainer";
import MyHeader from "../MyHeader/MyHeader";
import axios from "axios";

function AdditionalService() {

    const [services, setServices] = useState([
        {}
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/additionalSP');
                console.log('GET request successful:', response.data.plans);
                setServices(response.data.plans);
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
                <MyHeader>Additional Services 🍴</MyHeader>
                <AdditionalServiceCardContainer 
                    data={services}
                />
            </div>
        </div>
    )
}

export default AdditionalService
