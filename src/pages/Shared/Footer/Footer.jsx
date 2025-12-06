const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content">
                <aside>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                    <p className="font-bold text-lg font-playfair">ServiceScope Ltd.<br /><span className="text-sm font-normal font-lato">Connecting you with the best services since 2023</span></p>
                </aside>
                <nav className="font-lato">
                    <header className="footer-title opacity-100 text-white font-playfair">Services</header>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav className="font-lato">
                    <header className="footer-title opacity-100 text-white font-playfair">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className="font-lato">
                    <header className="footer-title opacity-100 text-white font-playfair">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-neutral text-neutral-content border-base-300">
                <aside className="items-center grid-flow-col">
                    <p className="font-lato">Copyright © {new Date().getFullYear()} - All right reserved by ServiceScope Ltd</p>
                </aside> 
                <nav className="md:place-self-center justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a href="#" className="text-2xl"><i className="fa-brands fa-twitter"></i></a> 
                        <a href="#" className="text-2xl"><i className="fa-brands fa-youtube"></i></a> 
                        <a href="#" className="text-2xl"><i className="fa-brands fa-facebook"></i></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;