module.exports = {
   stringMatch: (string1, string2, options) => {
      return (string1 === string2) ? options.fn(this) : options.inverse(this);
   }
}