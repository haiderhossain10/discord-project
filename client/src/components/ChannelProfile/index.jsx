import { NavLink } from "react-router-dom";

const ChannelProfile = ({ data }) => {
    const name = [];
    data.channelName?.split(" ").forEach((item) => {
        item.split(" ").forEach((it, ind) => {
            name.push(it[ind].split(" ")[0]);
        });
    });
    return (
        <>
            <NavLink
                to={`/channel/${data._id}`}
                className={(navData) =>
                    navData.isActive
                        ? "h-14 w-14 mb-3 last-of-type:mb-0 uppercase bg-ui-primary rounded text-white font-bold hover:bg-ui-primary-hover flex items-center justify-center"
                        : "h-14 w-14 mb-3 last-of-type:mb-0 uppercase bg-ui-tertiary rounded-full text-white font-bold hover:bg-ui-primary-hover ease-in duration-300 flex items-center justify-center"
                }
            >
                {name.join("")}
            </NavLink>
        </>
    );
};

export default ChannelProfile;
