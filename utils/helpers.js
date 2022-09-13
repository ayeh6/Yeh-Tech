module.exports = {
   stringMatch: (string1, string2, options) => {
      console.log(string1 + ", " + string2);
      return (string1 === string2) ? options.fn(this) : options.inverse(this);
   }
}