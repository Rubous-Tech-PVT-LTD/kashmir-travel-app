const bcrypt = require('bcryptjs');
const password = 'rayeeswagay@121180';
bcrypt.hash(password, 10).then(hash => {
  console.log(hash);
});
