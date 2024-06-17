/* eslint-disable react/prop-types */
import { useState } from 'react';
import './MyTable.css';

const MyTable = ({ headers, data, onCellEdit, onDeleteRow }) => {
    const [editableCell, setEditableCell] = useState(null);

    const handleCellClick = (rowIndex, cellIndex, isEditable) => {
        if (isEditable) {
        setEditableCell({ rowIndex, cellIndex });
        }
    };

    const handleCellBlur = () => {
        setEditableCell(null);
    };

    const handleCellChange = (e, rowIndex, cellIndex) => {
        const newValue = e.target.value;
        onCellEdit(rowIndex, cellIndex, newValue);
    };

    const handleDeleteRow = (rowIndex) => {
        onDeleteRow(rowIndex);
    };

    return (
        <table className="custom-table">
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
                {row.map((cell, cellIndex) => (
                <td
                    key={cellIndex}
                    onClick={() => handleCellClick(rowIndex, cellIndex, headers[cellIndex].editable)}
                    onBlur={handleCellBlur}
                    className={editableCell && editableCell.rowIndex === rowIndex && editableCell.cellIndex === cellIndex ? 'editable' : ''}
                >
                    {editableCell && editableCell.rowIndex === rowIndex && editableCell.cellIndex === cellIndex ? (
                    <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellChange(e, rowIndex, cellIndex)}
                    />
                    ) : (
                    cell
                    )}
                </td>
                ))}
                <td className='dlt'>
                    <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default MyTable;
