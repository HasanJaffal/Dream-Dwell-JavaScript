import './ServicePlanCard.css'

// eslint-disable-next-line react/prop-types
const ServicePlanCard = ({ image, description, name, cost }) => {
    return (
        <div className="card cursor-pointer">
            <img src={image} alt="Card" className="image" />
            <div className="content">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
                <p className="cost">{`$${cost} per night`}</p>
            </div>
        </div>
    );
};

export default ServicePlanCard;
