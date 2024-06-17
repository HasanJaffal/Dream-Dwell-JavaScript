/* eslint-disable react/prop-types */
import "./SideBar.css";

function SideBar({ children }) {
    return (
        <div className="flex gap-4 ">
            <div className="button-group2 ">
                {children}
            </div>
        </div>
    )
}

export default SideBar
