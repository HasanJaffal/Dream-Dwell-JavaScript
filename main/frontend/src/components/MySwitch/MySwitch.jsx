/* eslint-disable react/prop-types */

import { useState } from 'react';
import './MySwitch.css';

const  MySwitch = ({ label, onChange, checked }) => {
    const [isChecked, setChecked] = useState(checked || false);

    const handleChange = () => {
        setChecked(!isChecked);
        if (onChange) {
        onChange(!isChecked);
        }
    };

    return (
        <div className="switch-container">
        {label && <label className="switch-label">{label}</label>}
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            <span className="slider round"></span>
        </label>
        </div>
    );
};

export default MySwitch;
