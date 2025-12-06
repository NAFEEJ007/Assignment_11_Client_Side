import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const url = `http://localhost:5000/services?search=${search}&category=${category}`;
        axios.get(url)
            .then(res => {
                setServices(res.data);
                setLoading(false);
            });
    }, [search, category]);

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
    }

    return (
        <div className="my-12 px-4 lg:px-12">
            <Helmet>
                <title>ServiceScope | All Services</title>
            </Helmet>
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Explore All Services</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Find the best services tailored to your needs. Search by name or filter by category to find exactly what you're looking for.</p>
            </div>
            
            {/* Search and Filter */}
            <div className="bg-base-200 p-6 rounded-xl mb-12 flex flex-col md:flex-row justify-center items-center gap-4 shadow-md">
                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                    <input type="text" name="search" placeholder="Search services..." className="input input-bordered w-full md:w-80 focus:input-primary" />
                    <button type="submit" className="btn btn-primary text-white">Search</button>
                </form>
                <select className="select select-bordered w-full md:w-auto focus:select-primary" onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Auto Services">Auto Services</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : services.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-400">No services found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div 
                            key={service._id} 
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <figure className="h-60 overflow-hidden">
                                <img src={service.serviceImage} alt={service.serviceTitle} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body">
                                <div className="badge badge-outline mb-2">{service.category}</div>
                                <h2 className="card-title text-2xl">{service.serviceTitle}</h2>
                                <p className="text-gray-600">{service.description.slice(0, 100)}...</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xl font-bold text-primary">${service.price}</p>
                                    <Link to={`/services/${service._id}`}>
                                        <button className="btn btn-primary btn-sm">See Details</button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllServices;