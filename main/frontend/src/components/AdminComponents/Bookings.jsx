/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import AdminTable from "../AdminTable/AdminTable";
import { useEffect, useState } from "react";

function Bookings() {
    const token = localStorage.getItem('token')    
    const headers = [
        { label: 'ID', key: '_id', editable: false },
        { label: 'User ID', key: 'userId', editable: false },
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
            const response = await axios.get(`http://localhost:4000/api/booking`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                  },
            });
            console.log('GET request successful:', response.data.booking);
            setTableData(response.data.booking);
            console.log(tableData)
        } catch (error) {
            console.error('Error making GET request:', error);
        }
        };
        fetchData();
    }, []);

    const handleCellEdit = (rowIndex, cellIndex, newValue) => {
        const updatedData = [...tableData];
        console.log('Before cell edit - updatedData:', updatedData);

        const columnName = cellIndex;
        console.log('columnName:', columnName);

        if (columnName) {
        updatedData[rowIndex] = {
            ...updatedData[rowIndex],
            [columnName]: newValue,
        };
        setTableData(updatedData);

        console.log('After cell edit - updatedData:', updatedData);

        const bookingId = tableData[rowIndex]._id;
        console.log('bookingId:', bookingId);

        const updatedDataForServer = { [columnName]: newValue };
        console.log('Updated Data for Server:', updatedDataForServer);

        const updateData = async () => {
            try {
            const response = await axios.put(`http://localhost:4000/api/booking/${bookingId}`, updatedDataForServer,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                  },
            });
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
        const updatedData = [...tableData];
        updatedData[rowIndex].status = 'handed';
        setTableData(updatedData);

        const bookingId = tableData[rowIndex]._id;
        console.log('Before delete - bookingId:', bookingId);

        try {
        const response = await axios.put(`http://localhost:4000/api/booking/${bookingId}`, { status: 'handed' },{
            headers: {
                'Authorization': `Bearer ${token}`,
              },
        });
        console.log('PUT request for delete successful:', response.data.booking);
        } catch (error) {
        console.error('Error making PUT request for delete:', error);
        }
    };

    console.log('Render - tableData:', tableData);

    return (
        <div className="wrapper">
        <AdminTable
            headers={headers}
            data={tableData}
            onCellEdit={handleCellEdit}
            onDeleteRow={handleDeleteRow}
            removeAdd
            joker={"Hand Room"}
        />
        </div>
    );
}

export default Bookings;
