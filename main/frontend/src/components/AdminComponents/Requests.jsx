import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function Requests() {
    const headers = [
        { label: 'ID', key: '_id', editable: false },
        { label: 'Booking', key: 'bookingId', editable: false, required: true },
        { label: 'Additional Service', key: 'additionalServiceId', editable: false, required: true },
        { label: 'Count', key: 'count', editable: false, required: true},
    ];
    const token = localStorage.getItem('token')
    const [tableData, setTableData] = useState([
        {}
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/requests', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.request);
                setTableData(response.data.request);
            }
            catch (error) {
                console.error('Error making GET request:', error);
            }
        };
        fetchData();
        }, []);

        const handleCellEdit = (rowIndex, cellIndex, newValue) => {
            const updatedData = [...tableData];
            updatedData[rowIndex][cellIndex] = newValue;
            setTableData(updatedData);
        
            const updateData = async () => {
                try {
                    const Id = tableData[rowIndex]._id;
                    const updatedData = { [headers[cellIndex]]: newValue }; // Assuming tableColumns is an array of column names
                    const response = await axios.put(`http://localhost:4000/api/requests/${Id}`, updatedData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                          },
                    });
        
                    console.log('PUT request successful:', response.data);
                } catch (error) {
                    console.error('Error making PUT request:', error);
                }
            };
            updateData();
        };

        const handleDeleteRow = (rowIndex) => {

            const deleteData = async () => {
                try {
                    const response = await axios.delete(`http://localhost:4000/api/requests/${tableData[rowIndex]._id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                          },
                    });
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
                    const response = await axios.post(`http://localhost:4000/api/requests`, newRowData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                          },
                    });
                    console.log('GET request successful:', response.data);
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

export default Requests
