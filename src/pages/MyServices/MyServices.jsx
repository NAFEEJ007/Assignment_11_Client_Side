import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyServices = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(true);

    const url = `/my-services?email=${user?.email}`;

    useEffect(() => {
        setLoading(true);
        axiosSecure.get(url)
            .then(res => {
                setServices(res.data);
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
                axiosSecure.delete(`/services/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your service has been deleted.',
                                'success'
                            )
                            const remaining = services.filter(service => service._id !== id);
                            setServices(remaining);
                        }
                    })
            }
        })
    }

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const serviceImage = form.serviceImage.value;
        const serviceTitle = form.serviceTitle.value;
        const companyName = form.companyName.value;
        const website = form.website.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;

        const updatedService = {
            serviceImage,
            serviceTitle,
            companyName,
            website,
            description,
            category,
            price
        }

        axiosSecure.put(`/services/${editingService._id}`, updatedService)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire(
                        'Updated!',
                        'Your service has been updated.',
                        'success'
                    )
                    const updatedServices = services.map(service => {
                        if (service._id === editingService._id) {
                            return { ...service, ...updatedService };
                        }
                        return service;
                    });
                    setServices(updatedServices);
                    setEditingService(null);
                    document.getElementById('update_modal').close();
                }
            })
    }

    return (
        <div className="my-12 px-4">
            <Helmet>
                <title>ServiceScope | My Services</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-8">My Services: {services.length}</h2>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Service Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={service.serviceImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{service.serviceTitle}</td>
                                    <td>{service.category}</td>
                                    <td>${service.price}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditingService(service);
                                            document.getElementById('update_modal').showModal();
                                        }} className="btn btn-ghost btn-xs">Update</button>
                                        <button onClick={() => handleDelete(service._id)} className="btn btn-ghost btn-xs text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Update Service</h3>
                    {editingService && (
                        <form onSubmit={handleUpdate} className="py-4">
                            <div className="md:flex mb-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Service Image URL</span>
                                    </label>
                                    <input type="text" name="serviceImage" defaultValue={editingService.serviceImage} className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control md:w-1/2 ml-4">
                                    <label className="label">
                                        <span className="label-text">Service Title</span>
                                    </label>
                                    <input type="text" name="serviceTitle" defaultValue={editingService.serviceTitle} className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="md:flex mb-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Company Name</span>
                                    </label>
                                    <input type="text" name="companyName" defaultValue={editingService.companyName} className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control md:w-1/2 ml-4">
                                    <label className="label">
                                        <span className="label-text">Website</span>
                                    </label>
                                    <input type="text" name="website" defaultValue={editingService.website} className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="md:flex mb-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select name="category" defaultValue={editingService.category} className="select select-bordered w-full">
                                        <option>Home Services</option>
                                        <option>Auto Services</option>
                                        <option>Personal Care</option>
                                        <option>Tech Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-control md:w-1/2 ml-4">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="text" name="price" defaultValue={editingService.price} className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea name="description" defaultValue={editingService.description} className="textarea textarea-bordered w-full" required></textarea>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn" onClick={() => document.getElementById('update_modal').close()}>Close</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyServices;