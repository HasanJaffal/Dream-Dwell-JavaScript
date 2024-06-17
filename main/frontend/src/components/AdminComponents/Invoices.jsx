import axios from "axios";
import AdminTable from "../../components/AdminTable/AdminTable"
import { useEffect, useState } from "react";

function Invoices() {
    const headers = [
        { label: 'ID', key: '_id', editable: false },
        { label: 'Booking', key: 'bookingId', editable: false, required: true },
        { label: 'Total Cost', key: 'totalCost', editable: false },
        { label: 'Created At', key: 'createdAt', editable: false },
    ];

    const [tableData, setTableData] = useState([
        {}
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/invoice',);
                console.log('GET request successful:', response.data.inovice);
                setTableData(response.data.inovice);
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
                const response = await axios.delete(`http://localhost:4000/api/invoice/${tableData[rowIndex]._id}`);
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
                const response = await axios.post(`http://localhost:4000/api/invoice`, newRowData);
                console.log('GET request successful:', response.data.inovice);
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
                onDeleteRow={handleDeleteRow}
                onSubmit={handleAddRow}
            />
        </div>
    )
}

export default Invoices
