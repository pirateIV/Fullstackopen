import { messageStyle } from "../helpers";

const NotificationMessage = ({ message }) => {
  return (
    <div>
      {message.content && (
        <div
          style={messageStyle}
          className={message.success ? "success" : "error"}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};

export default NotificationMessage;
