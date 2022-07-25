import { IoIosArrowDown } from "react-icons/io";
import { FiHash } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Sidebar = () => {
    const getChannel = useSelector((state) => state.channel.channel);
    const { id } = useParams();

    const data = getChannel.filter((item) => {
        return item._id === id && item;
    });

    return (
        <>
            <div className="h-screen w-60 bg-ui-tertiary">
                {id && (
                    <>
                        <button className="flex items-center justify-between px-3 border-b w-full py-3 border-b-ui-secondary text-white font-bold">
                            {data[0]?.channelName}
                            <IoIosArrowDown />
                        </button>
                        <div className="px-3 mt-4">
                            <p className="text-sm text-ui-four font-bold mb-2">
                                Text Channel
                            </p>
                            <button className="flex items-center text-white gap-2 bg-ui-four py-1 px-2 rounded w-full">
                                <FiHash /> Genaral
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Sidebar;
