import "./GuestPage.css"
import NavBar from "../../components/NavBar/NavBar";
import { useState,useEffect } from "react";
import Home from "../../components/Home/Home";
import MyFooter from '../../components/MyFooter/MyFooter'
import NewBooking from "../../components/NewBooking/NewBooking";
import MyBookings from "../../components/MyBookings/MyBookings";
import Review from "../../components/Review/Review";
import AdditionalServices from "../../components/AdditionalService/AdditionalService";

function GuestPage() {
    const [content, setContent] = useState(<Home />);

    const [user,updateUser] =useState(JSON.parse(localStorage.getItem('userData')))

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        updateUser(storedData);
    }, [])
    console.log("User:",user)
  
  
    return (
        <div className="h-screen max-h-screen scroll-m-0">
            <header className="bg-blue-500 py-4">
            <NavBar
                label1="Home"                   onClick1={() => setContent(<Home />)}
                label2="New Booking"            onClick2={() => setContent(<NewBooking/>)}
                label3="My Bookings"            onClick3={() => setContent(<MyBookings />)}
                label4="Review"                 onClick4={() => setContent(<Review />)}
                label5="Additional Services"    onClick5={() => setContent(<AdditionalServices />)}
            >
              
                </NavBar>
               </header>
           
            <div style={{textAlign: "center", width: "100%", paddingBottom: "10%"}} >
                <div>{content}</div>
            </div>
            <MyFooter/>
        </div>
    );
}

export default GuestPage;