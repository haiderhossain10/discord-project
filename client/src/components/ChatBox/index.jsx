import axios from "axios";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { addNewMsg } from "../../store/features/channelSlice";
import moment from "moment";
import { IoMdArrowDropright } from "react-icons/io";
import msgAlert from "./../../assets/audio/msg-tone.mp3";
import { BsInfoCircleFill } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";

const ChatBox = () => {
    // audio tones
    const msgTone = new Audio(msgAlert);

    const { id } = useParams();
    const dispatch = useDispatch();
    const getChannelMsg = useSelector((state) => state.channel.channel);
    const [getMsg, setMsg] = useState("");
    const [uid, setUid] = useState("");
    const socket = useRef();
    const chatRef = useRef();

    // is option true
    const [isDropdownOpened, setDropdownOpened] = useState(false);

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    });

    // channel message
    const chatData = getChannelMsg.filter((item) => {
        return item._id === id;
    });

    // channel functionality
    useEffect(() => {
        socket.current = io("/");
        if ("_logged" in localStorage) {
            const token = window.localStorage.getItem("_logged");
            const decoded = jwtDecode(token);
            if (typeof decoded !== "undefined") {
                setUid(decoded._id);
            }
        }
    }, [setUid]);

    useEffect(() => {
        socket.current.on("msg_received", (data) => {
            dispatch(addNewMsg({ item: data }));
        });
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (getMsg !== "") {
            if ("_logged" in localStorage) {
                const token = window.localStorage.getItem("_logged");
                const decoded = jwtDecode(token);
                try {
                    const res = await axios({
                        url: `/api/v1/create/channel/msg?channelId=${id}&userId=${decoded._id}`,
                        method: "PUT",
                        data: {
                            msg: getMsg,
                        },
                    });
                    if (res.status === 201) {
                        socket.current.emit("msg_send", {
                            msg: getMsg,
                            data: new Date(),
                            userId: {
                                fullName: decoded.fullName,
                                _id: decoded._id,
                            },
                            channel: id,
                        });

                        msgTone.play();
                        msgTone.volume = 0.1;
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
            <div className="bg-ui-four h-screen w-full overflow-hidden">
                <div className="border-b p-3 border-b-ui-secondary flex items-center justify-between">
                    <h4 className="font-black text-white">
                        {typeof id !== "undefined" ? (
                            <span>
                                # {chatData[0]?.channelName} (Channel Creator:{" "}
                                <span className="capitalize">
                                    {chatData[0]?.channelCreatorId.fullName}
                                </span>
                                )
                            </span>
                        ) : (
                            <span># Example</span>
                        )}
                    </h4>
                    <div className="relative">
                        {typeof id !== "undefined" && (
                            <>
                                <OutsideClickHandler
                                    onOutsideClick={() => {
                                        setDropdownOpened(false);
                                    }}
                                >
                                    <button
                                        className="align-middle"
                                        onClick={() =>
                                            setDropdownOpened(!isDropdownOpened)
                                        }
                                    >
                                        <BsInfoCircleFill className="text-xl text-white " />
                                    </button>
                                </OutsideClickHandler>
                                {isDropdownOpened && (
                                    <ul className="absolute bg-white w-48 right-0 top-8">
                                        <li className="border-b border-b-ui-primary-hover last-of-type:border-b-0">
                                            <button className="text-sm py-2 px-3 w-full text-left hover:bg-ui-primary hover:text-white duration-200">
                                                Add People
                                            </button>
                                        </li>
                                        <li className="border-b border-b-ui-primary-hover last-of-type:border-b-0">
                                            <button className="text-sm py-2 px-3 w-full text-left hover:bg-ui-primary hover:text-white duration-200">
                                                Exit
                                            </button>
                                        </li>
                                        <li className="border-b border-b-fuchsia-400 last-of-type:border-b-0">
                                            <button className="text-sm py-2 px-3 w-full text-left hover:bg-ui-primary hover:text-white duration-200">
                                                Delete Channel
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-col px-3 justify-between">
                    <div
                        className="overflow-y-scroll ui-chat-box w-3/4"
                        style={{
                            height: "calc(100vh - 114px)",
                        }}
                        ref={chatRef}
                    >
                        {chatData[0]?._id === id &&
                            chatData[0]?.chat.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="mb-6 last-of-type:mb-0"
                                    >
                                        <h4 className="text-lg text-white">
                                            {/* <b>{item.userId.fullName}</b> */}
                                            <b>
                                                {uid === item.userId._id ? (
                                                    <span>
                                                        {item.userId.fullName}
                                                    </span>
                                                ) : (
                                                    <span className="text-red-400">
                                                        {item.userId.fullName}
                                                    </span>
                                                )}
                                            </b>
                                            <span className="text-sm ml-3 text-slate-400">
                                                {moment(item.data).calendar()}
                                            </span>
                                        </h4>
                                        <p className="text-sm text-white flex gap-1 items-center">
                                            <IoMdArrowDropright className="text-lg" />
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
