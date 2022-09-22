const { Client } = require('pg')

exports.execute = (config, query, rejMsg, resolveMsg) => {
  const client = new Client(config);

  const promise = new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        reject({msg: rejMsg, res: false});
      } else {
        client.query(query)
          .then(async data =>{ 
            resolve({msg: resolveMsg, err: "", res: data.rows})
            await client.end();
          })
          .catch(_ => reject({msg: rejMsg, res: false}))
      }
    });
  });
  return promise;
}