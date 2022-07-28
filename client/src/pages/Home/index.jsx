import { useEffect, useRef, useState } from "react";
import LeftBar from "../../components/LeftBar";
import Sidebar from "../../components/Sidebar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    addOnlineUser,
    initChannelData,
} from "../../store/features/channelSlice";
import CreateChannelModal from "../../components/CreateChannelModal";
import ChatBox from "../../components/ChatBox";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Option from "../../components/Option";
const Home = () => {
    const dispatch = useDispatch();
    const [isShowed, setShowed] = useState(false);

    const socket = useRef();

    const { id } = useParams();

    const channelCreateHandler = () => {
        setShowed(true);
    };

    useEffect(() => {
        socket.current = io("ws://haider-discord.herokuapp.com");
        socket.current.on("online_user_received", (data) => {
            dispatch(addOnlineUser(data));
        });
    }, [dispatch]);

    useEffect(() => {
        const init = async () => {
            if ("_logged" in localStorage) {
                const token = window.localStorage.getItem("_logged");
                const decoded = jwtDecode(token);

                try {
                    const res = await axios({
                        url: `/api/v1/find/joined/channel?userId=${decoded._id}`,
                    });
                    if (res.status === 200) {
                        dispatch(initChannelData(res.data.data));
                        socket.current.emit("online_user_status", decoded);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        init();
    }, [dispatch]);

    return (
        <>
            <div className="flex relative">
                <LeftBar channelCreateHandler={channelCreateHandler} />
                {typeof id === "undefined" && <Sidebar />}

                <ChatBox />
                <Option />
                {isShowed && <CreateChannelModal state={setShowed} />}
            </div>
        </>
    );
};

export default Home;
