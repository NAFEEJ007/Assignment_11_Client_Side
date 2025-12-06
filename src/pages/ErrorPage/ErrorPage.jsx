import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="flex flex-col items-center justify-center h-screen font-lato">
            <h1 className="text-4xl font-bold mb-4 font-playfair">Oops!</h1>
            <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 mb-8">
                <i>{error.statusText || error.message}</i>
            </p>
            <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="404 Error" className="w-1/2 max-w-md mb-8" />
            <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;