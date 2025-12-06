import { useLoaderData, Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const ServiceDetails = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const location = useLocation();

    const { _id, serviceImage, serviceTitle, companyName, website, description, price, category } = service;

    useEffect(() => {
        axiosSecure.get(`/reviews/${_id}`)
            .then(res => setReviews(res.data));
    }, [_id, axiosSecure]);

    const handleAddReview = event => {
        event.preventDefault();
        const form = event.target;
        const textReview = form.textReview.value;

        const newReview = {
            serviceId: _id,
            serviceTitle,
            textReview,
            rating,
            userEmail: user?.email,
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            postedDate: new Date()
        }

        axiosSecure.post('/reviews', newReview)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Review added successfully');
                    setReviews([...reviews, newReview]);
                    form.reset();
                    setRating(0);
                }
            })
    }

    return (
        <div className="my-12 px-4 lg:px-12">
            <Helmet>
                <title>ServiceScope | {serviceTitle}</title>
            </Helmet>
            {/* Service Details */}
            <div className="card lg:card-side bg-base-100 shadow-xl mb-12 border border-base-200 overflow-hidden">
                <figure className="lg:w-1/2 h-[400px]">
                    <img src={serviceImage} alt={serviceTitle} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body lg:w-1/2 p-8">
                    <div className="badge badge-primary badge-outline mb-2">{category}</div>
                    <h2 className="card-title text-4xl font-bold mb-2">{serviceTitle}</h2>
                    <p className="text-xl font-semibold text-gray-600 mb-4">Provided by: <span className="text-primary">{companyName}</span></p>
                    <p className="mb-4 text-gray-600 leading-relaxed">{description}</p>
                    <div className="flex flex-col gap-2 mt-auto">
                        <p className="text-lg"><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer" className="link link-primary hover:text-primary-focus">{website}</a></p>
                        <p className="text-3xl font-bold text-primary mt-2">${price}</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-6 border-b pb-4">Reviews ({reviews.length})</h2>
                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map((review, index) => (
                            <div key={index} className="card bg-base-100 shadow-md p-6 border border-base-200">
                                <div className="flex items-start gap-4">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review.userPhoto || "https://i.ibb.co/tYw50P9/user.png"} alt={review.userName} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-lg">{review.userName}</h4>
                                            <span className="text-sm text-gray-500">{new Date(review.postedDate).toLocaleDateString()}</span>
                                        </div>
                                        <Rating
                                            initialRating={review.rating}
                                            emptySymbol={<FaRegStar className="text-gray-300 text-lg" />}
                                            fullSymbol={<FaStar className="text-yellow-500 text-lg" />}
                                            readonly
                                        />
                                        <p className="mt-3 text-gray-700 leading-relaxed">{review.textReview}</p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>

                {/* Add Review Form */}
                <div className="lg:col-span-1">
                    {user ? (
                        <div className="card bg-base-100 shadow-xl p-6 border border-base-200 sticky top-24">
                            <h3 className="text-2xl font-bold mb-4">Write a Review</h3>
                            <form onSubmit={handleAddReview}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Rating</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Rating
                                            initialRating={rating}
                                            emptySymbol={<FaRegStar className="text-gray-300 text-2xl cursor-pointer" />}
                                            fullSymbol={<FaStar className="text-yellow-500 text-2xl cursor-pointer" />}
                                            onChange={(rate) => setRating(rate)}
                                        />
                                        <span className="text-lg font-bold ml-2">{rating} / 5</span>
                                    </div>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Review</span>
                                    </label>
                                    <textarea 
                                        name="textReview" 
                                        className="textarea textarea-bordered h-32 focus:textarea-primary" 
                                        placeholder="Share your experience with this service..." 
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary text-white">Submit Review</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="card bg-base-100 shadow-xl p-8 border border-base-200 text-center sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Please Login to Review</h3>
                            <p className="mb-6 text-gray-600">You need to be logged in to share your experience and rate this service.</p>
                            <Link to="/login" state={{from: location}} className="btn btn-primary text-white">Login Now</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;