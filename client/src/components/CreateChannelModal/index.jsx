import axios from "axios";
import { useForm } from "react-hook-form";
import OutsideClickHandler from "react-outside-click-handler";
import jwtDecode from "jwt-decode";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const CreateChannelModal = ({ state }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const socket = useRef();

    useEffect(() => {
        socket.current = io("/");
    }, []);

    const onSubmit = async (formData) => {
        if ("_logged" in localStorage) {
            const token = window.localStorage.getItem("_logged");
            const decoded = jwtDecode(token);
            try {
                const res = await axios({
                    url: `/api/v1/create/channel`,
                    method: "POST",
                    data: {
                        channelName: formData.channelName.trim(),
                        channelCreatorId: decoded._id,
                    },
                });
                socket.current.emit("create_channel", res.data.data);
                state(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div
                className="absolute w-full h-screen"
                style={{ backgroundColor: "rgba(0,0,0, .5" }}
            >
                <OutsideClickHandler onOutsideClick={() => state(false)}>
                    <div className="w-4/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ui-four p-10 rounded">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <input
                                    className="w-full h-10 focus:outline-none px-3 rounded text-sm"
                                    type="text"
                                    placeholder="Channel Name"
                                    {...register("channelName", {
                                        required: true,
                                    })}
                                />
                                {errors.channelName?.type === "required" && (
                                    <span className="text-sm text-red-600">
                                        Enter channel name
                                    </span>
                                )}
                            </div>
                            <button className="bg-ui-primary text-white h-10 px-10 rounded">
                                Create
                            </button>
                        </form>
                    </div>
                </OutsideClickHandler>
            </div>
        </>
    );
};

export default CreateChannelModal;
