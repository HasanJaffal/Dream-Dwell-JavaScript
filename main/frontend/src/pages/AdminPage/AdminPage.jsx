import "./AdminPage.css"
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import MyFooter from "../../components/MyFooter/MyFooter";
import SideBar from "../../components/SideBar/SideBar";
import MyHeader from "../../components/MyHeader/MyHeader";
import AdditionalServices from "../../components/AdminComponents/AdditionalServices";
import Bookings from "../../components/AdminComponents/Bookings";
import Guests from "../../components/AdminComponents/Guests";
import Invoices from "../../components/AdminComponents/Invoices";
import Requests from "../../components/AdminComponents/Requests";
import Rooms from "../../components/AdminComponents/Rooms";
import RoomTypes from "../../components/AdminComponents/RoomTypes";
import ServicePlans from "../../components/AdminComponents/ServicePlans";
import Reviews from "../../components/AdminComponents/Reviews";



function AdminPage() {
    const [isOpenSB, setIsOpenSB] = useState(true);
    const [content, setContent] = useState(<MyHeader>Welcome Admin!</MyHeader>);

    return (
        <div style={{display: "flex", flexDirection: "column"}} className="">
           <header className="bg-blue-500 py-4">
            <NavBar
                label1="Manage Resources"   onClick1={() => setIsOpenSB(!isOpenSB)}
            />
            </header>
            <div className="splitter">
                <div className="content-wrapper">
                    <div>{content}</div>
                </div>
                <div className="sidebar h-screen">
                    {
                        isOpenSB &&
                        <SideBar>
                            <button
                                 
                                style={{borderTop: "none"}}
                                onClick={() => setContent(<AdditionalServices />)}
                            >
                                Additional Services
                            </button>
                            <button
                                onClick={() => setContent(<Bookings />)}
                            >
                                Bookings
                            </button>
                            <button
                                onClick={() => setContent(<Guests />)}
                            >
                                Guests
                            </button>
                            <button
                                onClick={() => setContent(<Invoices />)}
                            >
                                Invoices
                            </button>
                            <button
                                onClick={() => setContent(<Requests />)}
                            >
                                Requests
                            </button>
                            <button
                                onClick={() => setContent(<Rooms />)}
                            >
                                Rooms
                            </button>
                            <button
                                onClick={() => setContent(<RoomTypes />)}
                            >
                                Room Types
                            </button>
                            <button
                                onClick={() => setContent(<ServicePlans />)}
                            >
                                Service Plans
                            </button>
                            <button
                                onClick={() => setContent(<Reviews />)}
                            >
                                Reviews
                            </button>
                        </SideBar>
                    }
                </div>
            </div>
            <MyFooter />
        </div>
    );
}

export default AdminPage;