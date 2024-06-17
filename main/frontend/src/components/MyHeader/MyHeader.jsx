/* eslint-disable react/prop-types */
import "./MyHeader.css"

function MyHeader({ children }) {
    return (
        <div className="header">
            <h1>{children}</h1>
        </div>
    )
}

export default MyHeader
