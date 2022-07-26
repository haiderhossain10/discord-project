import { useEffect, useState } from "react";
import LeftBar from "../../components/LeftBar";
import Sidebar from "../../components/Sidebar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { initChannelData } from "../../store/features/channelSlice";
import CreateChannelModal from "../../components/CreateChannelModal";
import ChatBox from "../../components/ChatBox";
import { useParams } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const [isShowed, setShowed] = useState(false);

    const { id } = useParams();

    const channelCreateHandler = () => {
        setShowed(true);
    };

    useEffect(() => {
        const findChanne = async () => {
            if ("_logged" in localStorage) {
                const token = window.localStorage.getItem("_logged");
                const decoded = jwtDecode(token);

                try {
                    const res = await axios({
                        url: `${process.env.REACT_APP_API}/api/v1/find/joined/channel?userId=${decoded._id}`,
                    });
                    dispatch(initChannelData(res.data.data));
                } catch (error) {
                    console.log(error);
                }
            }
        };
        findChanne();
    }, [dispatch]);

    return (
        <>
            <div className="flex relative">
                <LeftBar channelCreateHandler={channelCreateHandler} />
                {typeof id === "undefined" && <Sidebar />}

                <ChatBox />
                {isShowed && <CreateChannelModal state={setShowed} />}
            </div>
        </>
    );
};

export default Home;
