import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function Rooms() {
    const headers = [
        { key: '_id', editable: false, label: "ID" },
        { key: 'roomTypeId', editable: true, label: "Room Type", required: true },
    ];
    const token = localStorage.getItem('token')
    const [tableData, setTableData] = useState([
        {
            _id: 5,
            roomTypeId: 5,
            booked: 1,
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/rooms');
                console.log('GET request successful:', response.data.rooms);
                setTableData(response.data.rooms);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
        }, []);

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
    
                    const response = await axios.put(`http://localhost:4000/api/rooms/${bookingId}`, updatedData, {
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
        
        

    const handleDeleteRow = (rowIndex) => {

        const deleteData = async () => {
            try {
                const response = await axios.delete(`http://localhost:4000/api/rooms/${tableData[rowIndex]._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.rooms);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        deleteData();
        
        const updatedData = [...tableData];
        updatedData.splice(rowIndex, 1);
        setTableData(updatedData);
    };

    const handleAddRow = (newRowData) => {
        const addData = async () => {
            try {
                const response = await axios.post(`api/rooms`, newRowData);
                console.log('GET request successful:', response.data.rooms);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        addData();
        setTableData((prevData) => [...prevData, newRowData]);
    };

    return (
        <div>
            <AdminTable
                headers={headers}
                data={tableData}
                onCellEdit={handleCellEdit}
                onDeleteRow={handleDeleteRow}
                onSubmit={handleAddRow}
            />
        </div>
    )
}

export default Rooms
