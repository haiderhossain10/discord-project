import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { initUsers } from "../../store/features/channelSlice";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserModal = ({ state }) => {
    const dispatch = useDispatch();
    const getUsers = useSelector((state) => state.channel.users);

    const [getSearchTxt, setSeatchTxt] = useState(" ");
    const [getSearchResult, setSearchResult] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get("/api/v1/find/user");
                if (res.status === 200) {
                    dispatch(initUsers(res.data.data));
                    toast.success(res.data.data, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        init();
    }, [dispatch]);

    const formHandler = (e) => {
        e.preventDefault();
        if (getSearchTxt.length > 0 && getSearchTxt !== " ") {
            const data = getUsers.filter((item) =>
                item.fullName
                    .toLowerCase()
                    .includes(getSearchTxt.toLocaleLowerCase())
            );
            setSearchResult(data);
        } else {
            setSearchResult([]);
        }
    };

    const joinHandler = async (userId) => {
        try {
            const res = await axios({
                url: `/api/v1/create/join/channel?channelId=${id}&userId=${userId}`,
                method: "PUT",
            });
            if (res.status === 201) {
                toast.success("Thank you for join!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            if (error.response.status === 400) {
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
        }
        setTimeout(() => {
            state(false);
        }, 1000);
    };

    return (
        <>
            <div
                className="absolute w-full h-screen"
                style={{ backgroundColor: "rgba(0,0,0, .5" }}
            >
                <OutsideClickHandler onOutsideClick={() => state(false)}>
                    <div className="w-10/12 lg:w-4/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ui-four p-10 rounded">
                        <form onSubmit={formHandler}>
                            <div className="flex items-center">
                                <input
                                    className="h-10 w-full px-3 focus:outline-none rounded-l"
                                    type="text"
                                    placeholder="Find People..."
                                    value={getSearchTxt}
                                    onChange={(e) =>
                                        setSeatchTxt(e.target.value)
                                    }
                                />
                                <button
                                    className="h-10 w-10 bg-white flex justify-center items-center text-ui-secondary rounded-r hover:bg-ui-primary hover:text-white duration-200"
                                    type="submit"
                                >
                                    <FiSearch />
                                </button>
                            </div>
                        </form>
                        <div className="h-52 overflow-y-scroll ui-chat-box">
                            <h4 className="text-lg font-black text-white py-3">
                                Your Results : {getSearchResult.length}
                            </h4>
                            {getSearchResult.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 py-3"
                                    >
                                        <h4 className="text-md font-blod text-white">
                                            {item.fullName}
                                        </h4>
                                        <button
                                            onClick={() =>
                                                joinHandler(item._id)
                                            }
                                            className="bg-ui-primary hover:bg-ui-primary-hover duration-200 text-white py-1 px-3 rounded text-sm"
                                        >
                                            Join
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddUserModal;
