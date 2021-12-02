const generateRandomString = () => {
  let randomString = '';

  for (let i = 0; i < 6; i++) {
    // Generate a random integer number: 0, 1, or 2
    let rand = Math.floor(Math.random() * 3);

    if (rand === 0) {
      // Add a random number
      randomString += Math.floor(Math.random() * 9);
    } else if (rand === 1) {
      // Add a random uppercase letter
      randomString += String.fromCharCode(Math.floor((Math.random() * 26) + 65));
    } else {
      // Add a random lowercase letter
      randomString += String.fromCharCode(Math.floor((Math.random() * 26) + 97));
    }
  }
  return randomString;
};



module.exports = {generateRandomString};
