const { Client } = require('pg')


exports.execute = (config, query, rejMsg, resolveMsg) => {
  const client = new Client(config);

  const promise = new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        reject({ code: 400, msg: rejMsg, err: err });
      } else {
        await client.query(query);
        await client.end();
        resolve({ code: 200, msg: resolveMsg, err: "" });
      }
    });
  });
  return promise;
}