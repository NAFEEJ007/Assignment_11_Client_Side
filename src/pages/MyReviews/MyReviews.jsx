import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = `/my-reviews?email=${user?.email}`;

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(url)
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            });
    }, [url, axiosSecure]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your review has been deleted.',
                                'success'
                            )
                            const remaining = reviews.filter(review => review._id !== id);
                            setReviews(remaining);
                        }
                    })
            }
        })
    }

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const textReview = form.textReview.value;
        const rating = form.rating.value; // Note: This might need handling if using react-rating in form differently

        // Since react-rating is a component, we need to manage its state in the form or use a hidden input/state
        // For simplicity in this modal, let's assume we use the state `editingReview.rating` and update it via the component
        
        const updatedReview = {
            textReview,
            rating: editingReview.rating // Use the state from the editing object which we will update via onChange in the Rating component
        }

        axiosSecure.put(`/reviews/${editingReview._id}`, updatedReview)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        'Updated!',
                        'Your review has been updated.',
                        'success'
                    )
                    const updatedReviews = reviews.map(review => {
                        if (review._id === editingReview._id) {
                            return { ...review, ...updatedReview };
                        }
                        return review;
                    });
                    setReviews(updatedReviews);
                    setEditingReview(null);
                    document.getElementById('update_review_modal').close();
                }
            })
    }

    return (
        <div className="my-12 px-4">
            <Helmet>
                <title>ServiceScope | My Reviews</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-8">My Reviews: {reviews.length}</h2>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {reviews.map(review => (
                        <div key={review._id} className="card bg-base-100 shadow-xl p-6">
                            <h3 className="text-2xl font-bold mb-2">{review.serviceTitle}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">Rating:</span>
                                <Rating
                                    initialRating={review.rating}
                                    emptySymbol={<FaRegStar className="text-yellow-500" />}
                                    fullSymbol={<FaStar className="text-yellow-500" />}
                                    readonly
                                />
                            </div>
                            <p className="mb-4">{review.textReview}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => {
                                    setEditingReview(review);
                                    document.getElementById('update_review_modal').showModal();
                                }} className="btn btn-primary btn-sm">Update</button>
                                <button onClick={() => handleDelete(review._id)} className="btn btn-error btn-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            <dialog id="update_review_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Review</h3>
                    {editingReview && (
                        <form onSubmit={handleUpdate} className="py-4">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Service Title</span>
                                </label>
                                <input type="text" value={editingReview.serviceTitle} className="input input-bordered w-full" readOnly />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Rating</span>
                                </label>
                                <Rating
                                    initialRating={editingReview.rating}
                                    emptySymbol={<FaRegStar className="text-2xl text-gray-300" />}
                                    fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
                                    onChange={(rate) => setEditingReview({...editingReview, rating: rate})}
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Review</span>
                                </label>
                                <textarea name="textReview" value={editingReview.textReview} onChange={(e) => setEditingReview({...editingReview, textReview: e.target.value})} className="textarea textarea-bordered h-24" required></textarea>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn" onClick={() => document.getElementById('update_review_modal').close()}>Close</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;