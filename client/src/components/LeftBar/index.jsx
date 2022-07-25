import { useDispatch, useSelector } from "react-redux";
import ChannelProfile from "../ChannelProfile";
import { IoMdAdd } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { addNewChannel } from "./../../store/features/channelSlice";
import jwtDecode from "jwt-decode";

const LeftBar = ({ channelCreateHandler }) => {
    const channelData = useSelector((state) => state.channel.channel);
    const dispatch = useDispatch();

    const socket = useRef();

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET_URL);
    }, []);

    useEffect(() => {
        socket.current.on("create_channel", (data) => {
            if ("_logged" in localStorage) {
                const token = window.localStorage.getItem("_logged");
                const decoded = jwtDecode(token);

                if (data.channelCreatorId === decoded._id) {
                    dispatch(addNewChannel(data));
                }
            }
        });
    }, [dispatch]);

    return (
        <>
            <div className="h-screen bg-ui-secondary py-4 gap-3 px-3">
                <NavLink
                    to="/"
                    className={(navData) =>
                        navData.isActive
                            ? "h-14 w-14 text-2xl bg-ui-primary rounded text-white font-bold hover:bg-ui-primary-hover flex items-center justify-center"
                            : "h-14 w-14 text-2xl bg-ui-tertiary rounded-full text-white font-bold hover:bg-ui-primary-hover ease-in duration-300 flex items-center justify-center"
                    }
                >
                    <FaDiscord />
                </NavLink>
                <div className="my-3">
                    {channelData.length !== 0 &&
                        channelData.map((item, index) => {
                            return <ChannelProfile key={index} data={item} />;
                        })}
                </div>
                <button
                    onClick={channelCreateHandler}
                    className="h-14 w-14 bg-ui-tertiary rounded-full text-2xl text-ui-five font-bold hover:bg-ui-five hover:text-white ease-in duration-300 flex items-center justify-center"
                >
                    <IoMdAdd />
                </button>
            </div>
        </>
    );
};

export default LeftBar;
