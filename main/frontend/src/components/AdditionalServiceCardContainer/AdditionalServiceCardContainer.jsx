/* eslint-disable react/prop-types */

import AdditionalServiceCard from '../AdditionalServiceCard/AdditionalServiceCard';
import './AdditionalServiceCardContainer.css';

const images = [
    "public/room.jpg",
    "public/room2.jpg",
    "public/room3.png",
    "public/room4.jpg",
    "public/room5.jpg"
]

const AdditionalServiceCardContainer = ({ data, onClick }) => {
    return (
        <div className="card-container">
        {data.map((i, index) => (
            <AdditionalServiceCard
                key={index}
                name={i.name}
                image={images[ (index) % images.length]}
                description={i.description}
                cost={i.cost}
                _id={i._id}
                onClick={onClick}
            />
        ))}
        </div>
    );
};

export default AdditionalServiceCardContainer;
