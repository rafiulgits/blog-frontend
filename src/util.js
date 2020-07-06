export const filterHttpErrorMessages = err => {
  var messages = [];
  if (err.response == null) {
    messages.push("unable to connect with data server");
    return messages;
  }
  if (err.response.data) {
    for (var key in err.response.data) {
      messages.push(`${key} : ${err.response.data[key]}`);
    }
    return messages;
  }
  messages.push("internal error");
  return messages;
};
