import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formSubmit = async (data) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/login`,
                data
            );
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.localStorage.setItem("_logged", res.data.token);
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.error.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <div className="bg-ui-primary">
                <div className="container mx-auto h-screen flex items-center justify-center bg-ui-">
                    <div className="lg:w-4/12 w-full mx-3 lg:mx-auto bg-stone-800 p-6 rounded">
                        <div className="my-4">
                            <form onSubmit={handleSubmit(formSubmit)}>
                                <div className="mb-4">
                                    <label className="text-white text-sm mb-2 block">
                                        Enter Email
                                    </label>
                                    <input
                                        className="w-full h-10 px-3 focus:outline-none rounded bg-stone-900 text-white text-sm"
                                        type="email"
                                        {...register("mail", {
                                            required: true,
                                        })}
                                    />
                                    {errors.mail?.type === "required" && (
                                        <span className="text-sm text-red-600">
                                            Mail is required!
                                        </span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="text-white text-sm mb-2 block">
                                        Enter Password
                                    </label>
                                    <input
                                        className="w-full h-10 px-3 focus:outline-none rounded bg-stone-900 text-white text-sm"
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {errors.password?.type === "required" && (
                                        <span className="text-sm text-red-600">
                                            Password is required!
                                        </span>
                                    )}
                                </div>
                                <button className="bg-ui-primary h-10 px-6 text-sm rounded text-white hover:bg-ui-primary-hover duration-300 ease-in">
                                    Login
                                </button>
                                <Link
                                    className="text-sm text-white underline ml-3"
                                    to="/register"
                                >
                                    Create Account ?
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
