import { useSelector } from "react-redux";

const Option = () => {
    const getOnlineData = useSelector((state) => state.channel);
    return (
        <>
            <div className="w-60 bg-ui-secondary">
                <h4 className="text-white border-b border-b-ui-tertiary p-3">
                    Online Status:
                </h4>
                {getOnlineData.onlineUser.map((item) => {
                    return (
                        <h4 className="text-white p-3">
                            {item.fullName} <br />
                            <span className="text-xs text-green-500">
                                (Online)
                            </span>
                        </h4>
                    );
                })}
            </div>
        </>
    );
};

export default Option;
