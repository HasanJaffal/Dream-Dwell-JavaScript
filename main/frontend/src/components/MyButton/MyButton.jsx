import './MyButton.css'
// eslint-disable-next-line react/prop-types
function MyButton({ label, onClick }) {
    return (
        <button className='btn' onClick={onClick}>{label}</button>
    );
}

export default MyButton;
