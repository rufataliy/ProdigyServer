const chalk = require("chalk");

const success = text => {
    console.log(chalk.greenBright.bold(text));
};

const error = text => {
    console.log(chalk.redBright.bold(text));
};

const warning = text => {
    console.log(chalk.yellowBright.bold(text));
};

module.exports.success = success;
module.exports.error = error;
module.exports.warning = warning;