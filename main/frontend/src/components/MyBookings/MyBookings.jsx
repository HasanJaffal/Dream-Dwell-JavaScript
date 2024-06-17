/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import MyTable from '../AdminTable/AdminTable';
import { useEffect, useState } from "react";
import './MyBookings.css'

function MyBookings() {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log("Current User: ", user);

    const headers = [
        { label: 'ID', key: '_id', editable: false },
        { label: 'ServicePlan', key: 'servicePlanId', editable: false },
        { label: 'Room', key: 'roomId', editable: false },
        { label: 'Check-in', key: 'checkInDate', editable: false },
        { label: 'Check-out', key: 'checkOutDate', editable: true },
        { label: 'Status', key: 'status', editable: false },
    ];
    
    

    const [tableData, setTableData] = useState([{}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:4000/api/booking`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.booking);
                
                // Filter the data where userId is equal to user._id
                const filteredData = response.data.booking.filter(item => item.userId === user["_id"] && item.status !== 'canceled');
                setTableData(filteredData);
            } catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
    }, []); // Add user._id to the dependency array to re-run the effect when user._id changes
    

    const handleCellEdit = (rowIndex, cellIndex, newValue) => {
        const updatedData = [...tableData];
        console.log("updatedData: ", updatedData);
        const myRow = updatedData[rowIndex];
        console.log("myRow: ", myRow);

        const columnName = cellIndex;
        console.log("columnName: ", columnName)

        if (columnName) {
            updatedData[rowIndex] = {
            ...updatedData[rowIndex],
            [columnName]: newValue,
            };
            setTableData(updatedData);

            const updateData = async () => {
            try {
                const bookingId = tableData[rowIndex]._id;

                console.log('bookingId:', bookingId);
                console.log('columnName:', columnName);

                const updatedData = { [columnName]: newValue };
                console.log('Updated Data:', updatedData);

                const response = await axios.put(`http://localhost:4000/api/booking/${bookingId}`, updatedData);

                console.log('PUT request successful:', response.data.booking);
            } catch (error) {
                console.error('Error making PUT request:', error);
            }
            };

            updateData();
        } else {
            console.error('Error: Could not find key in data for cellIndex:', cellIndex);
        }
        };
        

        const handleDeleteRow = async (rowIndex) => {
            const currentDate = new Date();
            const checkInDate = new Date(tableData[rowIndex].checkInDate);
        
            // Check if current date is less than check-in date
            if (currentDate < checkInDate) {
                // Update the status field in the row to "canceled"
                const updatedData = [...tableData];
                updatedData[rowIndex].status = 'canceled';
                setTableData(updatedData);
        
                // Make a PUT request to update the status on the server
                const bookingId = tableData[rowIndex]._id;
                try {
                    const response = await axios.put(`http://localhost:4000/api/booking/${bookingId}`, { status: 'canceled' });
                    console.log('PUT request successful:', response.data.booking);
                } catch (error) {
                    console.error('Error making PUT request:', error);
                }
            } else {
                // Display alert if current date is not less than check-in date
                window.alert("Cannot cancel booking. Check-in date has already passed.");
            }
    };
    

    return (
        <div className="wrapper  -my-8 ">
            <MyTable
                headers={headers}
                data={tableData}
                onCellEdit={handleCellEdit}
                onDeleteRow={handleDeleteRow}
                removeAdd
                joker={"Cancel"}
            />
        </div>
    );
}

export default MyBookings;
