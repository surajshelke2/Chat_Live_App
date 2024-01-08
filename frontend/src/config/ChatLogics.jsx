export const getSender = (loggedUser, users) => {
    const sender = users.find((user) => user._id !== loggedUser._id);
    return sender ? sender.name : "Unknown Sender";
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };