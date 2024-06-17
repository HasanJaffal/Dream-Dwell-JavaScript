/* eslint-disable react/prop-types */
import { useState } from 'react';
import './AdminTable.css';

const AdminTable = ({ headers, data, onCellEdit, onDeleteRow, onSubmit, removeAdd, joker }) => {
    const [editableCell, setEditableCell] = useState(null);
    const [newRow, setNewRow] = useState({}); // State to manage the new row data

    const handleCellClick = (rowIndex, cellIndex, isEditable) => {
        if (isEditable) {
            setEditableCell({ rowIndex, cellIndex });
        }
    };

    const handleCellBlur = () => {
        setEditableCell(null);
    };

    const handleCellChange = (e, rowIndex, cellIndex, headerKey) => {
        const newValue = e.target.value;
        onCellEdit(rowIndex, headerKey, newValue);
    };

    const handleDeleteRow = (rowIndex) => {
        onDeleteRow(rowIndex);
    };

    const handleAddRow = () => {
        // Create a new row with empty values for required fields
        const newRowData = {};
        headers.forEach(header => {
            if (header.required) {
                newRowData[header.key] = '';
            }
        });
        setNewRow({ data: newRowData, isVirtual: true });
    };

    const handleSubmit = () => {
        // Submit the new row data
        if (newRow.isVirtual) {
            setNewRow({}); // Clear the new row state
            onSubmit(newRow.data);
        }
    };

    return (
        <div>
            <table className="custom-table max-w-max w-10">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header.label}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}>
                            {headers.map((header, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    onClick={() => handleCellClick(rowIndex, cellIndex, header.editable)}
                                    onBlur={handleCellBlur}
                                    className={editableCell && editableCell.rowIndex === rowIndex && editableCell.cellIndex === cellIndex ? 'editable' : ''}
                                >
                                    {editableCell && editableCell.rowIndex === rowIndex && editableCell.cellIndex === cellIndex ? (
                                        <input
                                            type="text"
                                            value={row[header.key]}
                                            onChange={(e) => handleCellChange(e, rowIndex, cellIndex, header.key)}
                                        />
                                    ) : (
                                        row[header.key]
                                    )}
                                </td>
                            ))}
                            <td className='dlt'>
                                {
                                    !joker
                                    ?
                                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                                    :
                                    <button style={{backgroundColor: "limegreen"}} onClick={() => handleDeleteRow(rowIndex)}>{joker}</button>
                                }
                            </td>
                        </tr>
                    ))}
                    {newRow.isVirtual && (
                        <tr className='greenish-row'>
                            {headers.map((header, cellIndex) => (
                                header.required && (
                                    <td key={cellIndex}>
                                        <input
                                            type="text"
                                            value={newRow.data[header.key]}
                                            placeholder={header.label}
                                            onChange={(e) => {
                                                const updatedData = { ...newRow.data };
                                                updatedData[header.key] = e.target.value;
                                                setNewRow({ ...newRow, data: updatedData });
                                            }}
                                        />
                                    </td>
                                )
                            ))}
                            <td>
                                <button className="submit" onClick={handleSubmit}>Submit</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!removeAdd && <button className="add" onClick={handleAddRow}>Add Row</button>}
        </div>
    );
};

export default AdminTable;
