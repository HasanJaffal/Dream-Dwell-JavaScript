import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function AdditionalServices() {
    const headers = [
        { label: "ID", key: '_id', editable: false },
        { label: "Name", key: 'name', editable: true, required: true },
        { label: "Description", key: 'description', editable: true, required: true },
        { label: "Cost", key: 'cost', editable: true, required: true },
    ];

    const [tableData, setTableData] = useState([{

    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/additionalSP');
                console.log('GET request successful:', response.data.plans);
                setTableData(response.data.plans);
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
    
                    const response = await axios.put(`http://localhost:4000/api/additionalSP/${bookingId}`, updatedData);
    
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
                    const response = await axios.delete(`http://localhost:4000/api/additionalSP/${tableData[rowIndex]._id}`);
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
                    const response = await axios.post(`http://localhost:4000/api/additionalSP`, newRowData);
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

export default AdditionalServices
