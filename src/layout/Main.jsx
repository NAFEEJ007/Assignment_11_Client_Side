import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
    const navigation = useNavigation();

    return (
        <div>
            <Navbar></Navbar>
            {navigation.state === "loading" ? 
                <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div> 
                : 
                <Outlet></Outlet>
            }
            <Footer></Footer>
        </div>
    );
};

export default Main;