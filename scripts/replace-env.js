const replace = require('replace-in-file');
const options = {
  files: 'build/index.html',
  from: /%REACT_APP_GA_M_ID%/g,
  to: process.env.REACT_APP_GA_M_ID,
};

try {
  replace.sync(options);
} catch (error) {
  console.error('Error occurred:', error);
}