const { options } = require("../routes");

module.exports = {
   dashboardButtonCheck: (loggedInUsername, username, options) => {
      return (loggedInUsername === username) ? options.fn(this) : options.inverse(this);
   }
}