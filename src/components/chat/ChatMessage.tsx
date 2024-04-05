import { FunctionComponent, useMemo } from "react";
import { Message } from "../../types/messageTypes";

import userProfilePic from "../../assets/profile_user.png";
import botProfilePic from "../../assets/profile_bot.png";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = ({ message }) => {
    const getNameLine = useMemo(() => {
        const components = [
            <div className="pb-2 fw-bold flex-fill text-nowrap text-small">{message.author}</div>,
            <div className="message-dtm text-secondary px-2 text-nowrap">{new Date(message.created_dtm).toLocaleString()}</div>,
        ];
        if (!message.is_bot) return components.reverse();
        return components;
    }, [message]);

    return (
        <div
            className={`chat-message d-flex p-2 my-3 chat-fly-${message.is_bot ? "left" : "right"}-animation border shadow-sm bg-opacity-10 ${
                message.is_bot ? "bg-info me-5" : "bg-secondary ms-5"
            }`}
        >
            {/* render profile pic on the left if bot */}
            {message.is_bot ? (
                <div className="pe-3">
                    <img style={{ height: "50px" }} src={botProfilePic} />
                </div>
            ) : (
                ""
            )}

            <div className={"flex-fill " + (message.is_bot ? "" : "text-secondary text-end")}>
                <div className="d-flex w-100">{getNameLine}</div>

                <div>{message.body}</div>
            </div>

            {/* render profile pic on the right if user */}
            {!message.is_bot ? (
                <div className="ps-3">
                    <img style={{ height: "50px" }} src={userProfilePic} />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ChatMessage;