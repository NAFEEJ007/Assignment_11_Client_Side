import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddService = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddService = event => {
        event.preventDefault();
        const form = event.target;
        const serviceImage = form.serviceImage.value;
        const serviceTitle = form.serviceTitle.value;
        const companyName = form.companyName.value;
        const website = form.website.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;

        const newService = {
            serviceImage,
            serviceTitle,
            companyName,
            website,
            description,
            category,
            price,
            userEmail: user?.email,
            userName: user?.displayName,
            userPhoto: user?.photoURL
        }

        axiosSecure.post('/services', newService)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Service added successfully');
                    navigate('/my-services');
                }
            })
    }

    return (
        <div className="p-24">
            <Helmet>
                <title>ServiceScope | Add Service</title>
            </Helmet>
            <h2 className="text-3xl font-extrabold text-center mb-8">Add a Service</h2>
            <form onSubmit={handleAddService}>
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Service Image URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="serviceImage" placeholder="Image URL" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Service Title</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="serviceTitle" placeholder="Service Title" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Company Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="companyName" placeholder="Company Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Website</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="website" placeholder="Website URL" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select name="category" className="select select-bordered w-full" required defaultValue="">
                            <option disabled value="">Pick a category</option>
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
                        <label className="input-group">
                            <input type="text" name="price" placeholder="Price" className="input input-bordered w-full" required />
                        </label>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="input-group">
                            <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Description" required></textarea>
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add Service" className="btn btn-block btn-primary" />
            </form>
        </div>
    );
};

export default AddService;