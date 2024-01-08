export const getSender = (loggedUser, users) => {
  if (users && users.length >= 2) {
    return users[0]._id === loggedUser?._id ? users[1].name : users[0].name;
  } else if (users && users.length === 1) {
    return users[0].name;
  } else {
   
    return "Unknown Sender";
  }
};

  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };