import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function Guests() {
    const token = localStorage.getItem('token')
    const headers = [
        { key: '_id', label: 'ID', editable: false },
        { key: 'userName', label: 'Username', editable: true, required: true },
        { key: 'firstName', label: 'First Name', editable: true, required: true },
        { key: 'lastName', label: 'Last Name', editable: true, required: true },
        { key: 'phoneNumber', label: 'Phone Number', editable: true, required: true },
        { key: 'email', label: 'Email', editable: true, required: true },
        { key: 'password', label: 'Password', editable: true, required: true },
        { key: 'address', label: 'Address', editable: true, required: true },
        { key: 'createdAt', label: 'Created At', editable: false },
        { key: 'previousVisits', label: 'Previous Visits', editable: false },
    ];
    

    const [tableData, setTableData] = useState([
        {}
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/guest');
                console.log('GET request successful:', response.data.users);
                setTableData(response.data.users);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
        }, []);

    const handleDeleteRow = (rowIndex) => {

        const deleteData = async () => {
            try {
                const response = await axios.delete(`http://localhost:4000/api/guest/${tableData[rowIndex]._id}`);
                console.log('GET request successful:', response.data);
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
                const response = await axios.post(`http://localhost:4000/api/guest`, newRowData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.inovice);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        addData();
        setTableData((prevData) => [...prevData, newRowData]);
    };

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

                const response = await axios.put(`http://localhost:4000/api/guest/${bookingId}`, updatedData, {
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

    return (
        <div>
            <AdminTable
                headers={headers}
                data={tableData}
                onCellEdit={handleCellEdit}
                onDeleteRow={handleDeleteRow}
                onSubmit={handleAddRow}
                removeAdd 
            />
        </div>
    )
}

export default Guests
