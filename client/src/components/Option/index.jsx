import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Option = () => {
    const getStateData = useSelector((state) => state.channel);
    const { id } = useParams();

    // joined users
    const joinedUsers = getStateData.channel.filter(
        (item) => item._id === id
    )[0]?.joined;

    // joined online users
    const online = getStateData.onlineUser.filter((item1) =>
        joinedUsers?.find(({ userId }) => userId._id === item1._id)
    );

    return (
        <>
            <div className="w-80 bg-ui-secondary">
                {typeof id !== "undefined" && (
                    <div>
                        <div className="px-3">
                            {online.map((item, index) => {
                                return (
                                    <h4 key={index} className="text-white py-3">
                                        {item.fullName} <br />
                                        <span className="text-xs text-green-500">
                                            (Online)
                                        </span>
                                    </h4>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Option;
