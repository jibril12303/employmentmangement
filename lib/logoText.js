const logo = require("asciiart-logo");
const logoText = (name) => {
  const logoText = logo({ name }).render();
  console.log(logoText);
  return;
};

module.exports = logoText;