import axios from "axios";
import { useState } from "react";
import "./Review.css";

function Review() {
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log("Current User: ", user);

  const token = localStorage.getItem("token");
  const [review, setReview] = useState({
    _id: 0,
    userId: 0,
    rating: 0,
    comment: "",
  });

  const handleAddReview = () => {
    const newRowData = {
      userId: user["_id"],
      rating: review.rating,
      comment: review.comment,
    };

    const addData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/reviews`,
          newRowData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("POST request successful:", response.data);
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    };

    addData();
    // Clear the form after submitting
    setReview({
      _id: 0,
      userId: 0,
      rating: 0,
      comment: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto my-12">
      <form
        className="form "
        onSubmit={(e) => {
          e.preventDefault();
          handleAddReview();
        }}
      >
        <label>
          Rating:
          <input
            type="number"
            min="1"
            max="10"
            value={review.rating}
            onChange={handleChange}
            name="rating"
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            value={review.comment}
            onChange={handleChange}
            name="comment"
          />
        </label>
        <button type="submit" className="button">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;
