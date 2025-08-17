const DB = [];

const registerByPromise = (user) => {
  const result = saveDB(user)
    .then(sendEmail)
    .then(getResult)
    .catch((error) => new Error(error)) // Exception Handle
    .finally(()=> console.log('Complete.')) // Always executes whether fulfilled or rejected.

  console.log("This will be pending : ", result); // pending.

  return result;
};

const saveDB = (user) => {
  const oldDBSize = DB.length + 1;

  DB.push(user);
  console.log(`Save ${user.name} to DB`);

  return new Promise((resolve, reject) => {
    if (DB.length > oldDBSize) {
      resolve(user);
    } else {
      reject(new Error("Save DB Error."));
    }
  });
};

const sendEmail = (user) => {
  console.log(`email to ${user.name}.`);

  return new Promise((resolve) => {
    resolve(user);
  });
};

const getResult = (user) => {
  return new Promise((resolve, reject) => {
    resolve(user);
  });
};

const myUser = { email: "andy@test.com", password: "1234", name: "andy" };

const result = registerByPromise(myUser);
result.then(console.log);

/**
 * then(onFulfilled)
 * then(onFulfilled, onRejected)
 *
 * then(
 *      (value) => fulfillment handler
 *      (reason) => rejection handler
 * )
 */
