import { Link, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from 'react-countup';
import { Helmet } from "react-helmet-async";

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ servicesCount: 0, reviewsCount: 0, usersCount: 0 });
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
            title: <>Expert Car Servicing <br/> for Your Vehicle</>,
            description: "Experience top-tier maintenance and repair services tailored to keep your car running smoothly."
        },
        {
            image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop",
            title: <>Professional & <br/> Reliable Mechanics</>,
            description: "Our certified team ensures your vehicle gets the best care with state-of-the-art equipment."
        },
        {
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
            title: <>Affordable Prices <br/> Premium Service</>,
            description: "Get the best value for your money with our transparent pricing and quality guarantee."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/services?limit=6`)
            .then(res => {
                console.log("Services fetched:", res.data);
                if (Array.isArray(res.data)) {
                    setServices(res.data);
                } else {
                    console.error("Data is not an array:", res.data);
                    setServices([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setLoading(false);
            });
        
        axios.get(`${import.meta.env.VITE_API_URL}/stats`)
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, [])

    return (
        <div>
            <Helmet>
                <title>ServiceScope | Home</title>
            </Helmet>
            {/* Banner Section */}
            <div className="carousel w-full h-[600px] rounded-xl overflow-hidden shadow-2xl mt-4 relative">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img src={slide.image} className="w-full h-full object-cover" />
                        <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] w-full">
                            <div className='text-white space-y-7 pl-12 w-full md:w-1/2'>
                                <motion.h2 
                                    key={currentSlide}
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className='text-6xl font-bold leading-tight font-playfair'
                                >
                                    {slide.title}
                                </motion.h2>
                                <p className="text-lg font-lato">{slide.description}</p>
                                <div className="flex gap-4">
                                    <button className="btn btn-primary border-none font-lato">Discover More</button>
                                    <button className="btn btn-outline text-white hover:bg-white hover:text-black font-lato">Latest Projects</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="absolute flex justify-end gap-4 transform -translate-y-1/2 left-5 right-5 bottom-0 z-20">
                    <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="btn btn-circle hover:bg-primary hover:text-white border-none">❮</button>
                    <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="btn btn-circle hover:bg-primary hover:text-white border-none">❯</button>
                </div>
            </div>

            {/* Featured Services Section */}
            <div className="my-24 px-4">
                <div className="text-center mb-16">
                    <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-3 font-lato">Service</h3>
                    <h2 className="text-5xl font-bold font-playfair mb-6 text-base-content">Our Featured Services</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-lato">Explore our wide range of professional services designed to meet all your needs with excellence and precision.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-400">No services found</h3>
                            <p className="text-gray-500 mt-2">Please add some services to see them here.</p>
                        </div>
                    ) : (
                        services.map(service => (
                        <motion.div 
                            key={service._id} 
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <figure className="h-60 overflow-hidden">
                                <img src={service.serviceImage} alt={service.serviceTitle} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-playfair">{service.serviceTitle}</h2>
                                <p className="text-gray-600 font-lato">{service.description?.slice(0, 100)}...</p>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xl font-bold text-primary font-lato">${service.price}</p>
                                    <Link to={`/services/${service._id}`}>
                                        <button className="btn btn-primary btn-sm font-lato">See Details</button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/services" className="btn btn-outline btn-primary px-8">More Services</Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative my-20 py-20 bg-fixed bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop)'}}>
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div className="relative z-10 text-white px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 font-playfair">Our Achievements</h2>
                    <div className="flex flex-wrap justify-center gap-16 text-center">
                        <div className="p-4">
                            <div className="text-6xl font-bold text-primary font-playfair">
                                <CountUp end={stats.servicesCount} duration={3} />
                            </div>
                            <div className="text-xl mt-2 font-lato uppercase tracking-wider">Services</div>
                        </div>
                        <div className="p-4">
                            <div className="text-6xl font-bold text-primary font-playfair">
                                <CountUp end={stats.reviewsCount} duration={3} />
                            </div>
                            <div className="text-xl mt-2 font-lato uppercase tracking-wider">Reviews</div>
                        </div>
                        <div className="p-4">
                            <div className="text-6xl font-bold text-primary font-playfair">
                                <CountUp end={stats.usersCount} duration={3} />
                            </div>
                            <div className="text-xl mt-2 font-lato uppercase tracking-wider">Users</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet Our Partners Section */}
            <div className="my-20 bg-base-200 py-20">
                <h2 className="text-4xl font-bold text-center mb-12 font-playfair">Meet Our Partners</h2>
                <div className="flex flex-wrap justify-center gap-12 px-4 max-w-7xl mx-auto">
                    <div className="text-center max-w-xs group">
                        <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-6 shadow-lg border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop" alt="AutoCare Alliance" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-bold font-playfair">AutoCare Alliance</h3>
                        <p className="text-gray-600 mt-2 font-lato">Leading provider of premium automotive parts and tools for our mechanics.</p>
                    </div>
                    <div className="text-center max-w-xs group">
                        <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-6 shadow-lg border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=300&auto=format&fit=crop" alt="HomeFix Pro" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-bold font-playfair">HomeFix Pro</h3>
                        <p className="text-gray-600 mt-2 font-lato">Certified network of home improvement professionals and contractors.</p>
                    </div>
                    <div className="text-center max-w-xs group">
                        <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-6 shadow-lg border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=300&auto=format&fit=crop" alt="TechGuard" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="text-xl font-bold font-playfair">TechGuard</h3>
                        <p className="text-gray-600 mt-2 font-lato">Global leader in electronic device insurance and technical support.</p>
                    </div>
                </div>
            </div>

            {/* Extra Section 1: Why Choose Us */}
            <div className="my-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-playfair mb-4">Why Choose Us</h2>
                    <p className="text-gray-500 font-lato max-w-2xl mx-auto">We are committed to providing the best service experience with our dedicated team and customer-centric approach.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center border-t-4 border-primary">
                        <div className="text-6xl mb-6">🏆</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">Quality Service</h3>
                        <p className="font-lato text-gray-600">We ensure the best quality for all our services, maintaining high standards in every project we undertake.</p>
                    </div>
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center border-t-4 border-primary">
                        <div className="text-6xl mb-6">⏱️</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">Timely Delivery</h3>
                        <p className="font-lato text-gray-600">We value your time and deliver on schedule, ensuring that your plans are never disrupted by delays.</p>
                    </div>
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-8 text-center border-t-4 border-primary">
                        <div className="text-6xl mb-6">💬</div>
                        <h3 className="text-2xl font-bold mb-4 font-playfair">24/7 Support</h3>
                        <p className="font-lato text-gray-600">Our support team is always here to help you, providing round-the-clock assistance for any queries.</p>
                    </div>
                </div>
            </div>

            {/* Extra Section 2: Testimonials */}
            <div className="my-24 py-12 px-4 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 font-playfair">What Our Customers Say</h2>
                <div className="carousel w-full">
                    <div id="item1" className="carousel-item w-full justify-center">
                        <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body text-center">
                                <div className="flex justify-center gap-1 mb-4 text-yellow-500 text-xl">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                </div>
                                <p className="italic text-xl font-lato text-gray-600 mb-6">"I found the perfect mechanic for my car through this site. The service was professional and the price was transparent. Highly recommended!"</p>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg font-playfair">Alex Johnson</div>
                                        <div className="text-sm text-gray-500 font-lato">Car Owner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div id="item2" className="carousel-item w-full justify-center">
                        <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body text-center">
                                <div className="flex justify-center gap-1 mb-4 text-yellow-500 text-xl">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                </div>
                                <p className="italic text-xl font-lato text-gray-600 mb-6">"The home cleaning service I booked was exceptional. The team arrived on time and did a fantastic job. Will definitely use again."</p>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg font-playfair">Sarah Williams</div>
                                        <div className="text-sm text-gray-500 font-lato">Homeowner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> 
                <div className="flex justify-center w-full py-2 gap-2 mt-8">
                    <a href="#item1" className="btn btn-sm btn-circle btn-primary">1</a> 
                    <a href="#item2" className="btn btn-sm btn-circle btn-primary">2</a> 
                </div>
            </div>

        </div>
    );
};

export default Home;