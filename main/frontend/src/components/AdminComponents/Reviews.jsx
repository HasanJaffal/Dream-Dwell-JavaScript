import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function Reviews() {
    const headers = [
        { key: '_id', label: 'ID', editable: false },
        { key: 'userId', label: 'User ID', editable: false, required: true },
        { key: 'rating', label: 'Rating', editable: false, required: true },
        { key: 'comment', label: 'Comment', editable: false, required: true },
    ];
    const token = localStorage.getItem('token')

    const [tableData, setTableData] = useState([
        {}
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/reviews', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                      },
                });
                console.log('GET request successful:', response.data.reviews);
                setTableData(response.data.reviews);
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
                    const response = await axios.put(`http://localhost:4000/api/reviews/${Id}`, updatedData, {
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
                    const response = await axios.delete(`http://localhost:4000/api/reviews/${tableData[rowIndex]._id}`, {
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
                    const response = await axios.post(`http://localhost:4000/api/reviews`, newRowData, {
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
                removeAdd
            />
        </div>
    )
}

export default Reviews
