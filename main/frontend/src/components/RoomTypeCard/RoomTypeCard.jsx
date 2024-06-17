import './RoomTypeCard.css';

// eslint-disable-next-line react/prop-types
const RoomTypeCard = ({ image, name, description, costPerNight }) => {
    return (
        <div className="card cursor-pointer">
            <img src={image} alt="IMAGE" className="image" />
            <div className="content">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
                <p className="cost">{`$${costPerNight} per night`}</p>
            </div>
        </div>
    );
};

export default RoomTypeCard;
