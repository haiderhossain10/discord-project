import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { addNewMsg } from "../../store/features/channelSlice";

const ChatBox = () => {
    const getChannelMsg = useSelector((state) => state.channel.channel);
    const { id } = useParams();
    const [getMsg, setMsg] = useState("");
    const socket = useRef();
    const dispatch = useDispatch();

    const chatRef = useRef();

    const chatData = getChannelMsg.filter((item) => {
        return item._id === id;
    });

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET_URL);
    }, []);

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });

    useEffect(() => {
        if ("_logged" in localStorage) {
            const token = window.localStorage.getItem("_logged");
            const decoded = jwtDecode(token);
            socket.current.on("msg_send", (data) => {
                if (
                    data.userId._id === decoded._id &&
                    data.channel._id === id
                ) {
                    dispatch(addNewMsg({ item: data, channelId: id }));
                }
            });
        }
    }, [dispatch, id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (getMsg !== "") {
            if ("_logged" in localStorage) {
                const token = window.localStorage.getItem("_logged");
                const decoded = jwtDecode(token);
                try {
                    const res = await axios({
                        url: `${process.env.REACT_APP_API}/api/v1/create/channel/msg?channelId=${id}&userId=${decoded._id}`,
                        method: "PUT",
                        data: {
                            msg: getMsg,
                        },
                    });
                    if (res) {
                        socket.current.emit("msg_send", {
                            msg: getMsg,
                            data: new Date(),
                            userId: {
                                fullName: decoded.fullName,
                                _id: decoded._id,
                            },
                            channel: res.data.data,
                        });
                        setMsg("");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    return (
        <>
            <div className="bg-ui-four w-3/5 h-screen">
                <div className="border-b p-3 border-b-ui-secondary">
                    <h4 className="font-black text-white"># General</h4>
                </div>
                <div className="p-3 flex flex-col justify-between">
                    <div
                        className="overflow-y-scroll"
                        ref={chatRef}
                        style={{
                            height: "calc(100vh - 140px)",
                        }}
                    >
                        {chatData[0]?.chat.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-3 last-of-type:mb-0"
                                >
                                    <h4 className="text-lg text-white">
                                        <b>{item.userId.fullName}</b>
                                        <span className="text-sm ml-3 text-slate-400">
                                            {item.data}
                                        </span>
                                    </h4>
                                    <p className="text-sm text-white">
                                        {item.msg}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="py-3">
                        <form onSubmit={submitHandler}>
                            <input
                                className="w-full h-10 rounded px-3 bg-ui-secondary text-white focus:outline-none"
                                type="text"
                                placeholder="type..."
                                value={getMsg}
                                onChange={(e) => setMsg(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;
