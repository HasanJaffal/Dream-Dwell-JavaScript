/* eslint-disable react/prop-types */

import ServicePlanCard from '../ServicePlanCard/ServicePlanCard';

const images = [
    "public/room.jpg",
    "public/room2.jpg",
    "public/room3.png",
    "public/room4.jpg",
    "public/room5.jpg"
]

const ServicePlanCardContainer = ({ data }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 mx-auto max-w-max">
        {data.map((i, index) => (
            <ServicePlanCard
                key={index}
                name={i.name}
                image={images[index % images.length + 1]}
                description={i.description}
                cost={i.cost}
            />
        ))}
        </div>
    );
};

export default ServicePlanCardContainer;
