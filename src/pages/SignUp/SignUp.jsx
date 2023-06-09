import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Provider/AuthProvider";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate('/'); 
            });
    };

    return (
        <>
            <Helmet>
                <title>Martial Arts | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:w-1/2 lg:text-left">
                        <h1 className="text-5xl text-center font-bold mb-4">Sign Up!</h1>
                        <img className='items-center ' src="https://i.ibb.co/1rmfzry/login.jpg" alt="" />
                    </div>
                    <div className="card flex-shrink-0 lg:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <span className="text-red-600">Name is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && (
                                    <span className="text-red-600">Photo URL is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email && (
                                    <span className="text-red-600">Email is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/
                                    })}
                                    placeholder="password"
                                    className="input input-bordered"
                                />

                                {errors.password?.type === 'required' && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <p className="text-red-600">Password must be 6 characters</p>
                                )}
                                {errors.password?.type === 'pattern' && (
                                    <p className="text-red-600">
                                        Password must have one Uppercase one lowercase and one special character.
                                    </p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/,
                                        validate: (value) => value === watch('password')
                                    })}
                                    placeholder="password"
                                    className="input input-bordered"
                                />

                                {errors.confirmPassword?.type === 'required' && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.confirmPassword?.type === 'minLength' && (
                                    <p className="text-red-600">Password must be 6 characters</p>
                                )}
                                {errors.confirmPassword?.type === 'pattern' && (
                                    <p className="text-red-600">
                                        Password must have one Uppercase one lowercase and one special character.
                                    </p>
                                )}
                                {errors.confirmPassword?.type === 'validate' && (
                                    <p className="text-red-600">Passwords do not match</p>
                                )}
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p>
                            <small>
                                Already have an account{' '}
                                <Link className="text-blue-700" to="/login">
                                    Login
                                </Link>
                            </small>
                        </p>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
