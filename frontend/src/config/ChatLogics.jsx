export const getSender = (loggedUser, users) => {
    const sender = users.find((user) => user._id !== loggedUser._id);
    return sender ? sender.name : "Unknown Sender";
  };
  