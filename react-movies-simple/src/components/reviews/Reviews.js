import React from "react";
import ReviewItem from "./ReviewItem";

const Reviews = ({ reviews = [] }) => {
  if (reviews.length > 0) {
    return reviews.map((review) => (
      <ReviewItem review={review} key={review.id} />
    ));
  } else {
    return (
      <div className="card my-3 w-100">
        <div className="row m-0 w-100">
          <h5 className="card-header">No Reviews</h5>
        </div>
      </div>
    );
  }
};

export default Reviews;
