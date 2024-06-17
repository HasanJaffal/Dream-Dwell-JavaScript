/* eslint-disable react/prop-types */

import RoomTypeCard from '../RoomTypeCard/RoomTypeCard';

const images = [
    "public/room.jpg",
    "public/room2.jpg",
    "public/room3.png",
    "public/room4.jpg",
    "public/room5.jpg"
]

const RoomTypeCardContainer = ({ data }) => {
    return (
        <div className=" grid lg:grid-cols-3 sm:grid-cols-2 mx-auto max-w-max grid-cols-1">
        {data.map((i, index) => (
            <RoomTypeCard
            key={index}
            name={i.name}
            image={images[ (index) % images.length]}
            description={i.description}
            costPerNight={i.singleNightCost}
            />
        ))}
        </div>
    );
};

export default RoomTypeCardContainer;
