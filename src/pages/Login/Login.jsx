import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { signIn, googleSignIn, githubSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Login Successful");
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setError("Invalid email or password");
                toast.error("Login Failed: " + error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success("Google Login Successful");
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user);
                toast.success("Github Login Successful");
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="hero min-h-screen bg-base-200 font-lato">
            <Helmet>
                <title>ServiceScope | Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold text-primary font-playfair">Welcome Back!</h1>
                    <p className="py-6 text-lg font-lato">Access your account to manage your services, write reviews, and connect with professionals. We're glad to see you again.</p>
                    <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1684644444~exp=1684645044~hmac=..." alt="Login Illustration" className="rounded-xl shadow-lg max-w-md mx-auto lg:mx-0 hidden lg:block" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-base-200">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold text-center mb-4 font-playfair">Login to your account</h2>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered focus:input-primary" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered focus:input-primary" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary text-white" type="submit" value="Login" />
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </form>
                        <div className="divider">OR</div>
                        <div className="space-y-3">
                            <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-2 hover:bg-base-200 hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                                Continue with Google
                            </button>
                        </div>
                        <p className='my-4 text-center text-sm'>New to Service Review? <Link className='text-primary font-bold hover:underline' to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;