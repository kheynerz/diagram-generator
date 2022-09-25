const { Client } = require('pg')

const checkCredentials = (config) => {
  if(config?.host !== undefined && config?.database !== undefined && config?.port !== undefined && config?.user !== undefined && config?.password !== undefined){
    return (config.host !== '' &&  config.database !== '' && config.port !== '' && config.user !== '' && config.password !== '')
  }
}

exports.execute = (config, query, rejMsg, resolveMsg) => {
  if (!checkCredentials(config)) {
    console.log(config);
    const promise = new Promise((_, reject) => {
      reject({msg: 'Some credentials were not provided', res: false, connect : false, success: false})
    })
    return promise
  }
  const client = new Client(config);

  const promise = new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        console.log('Error de conexion');

        reject({msg: 'Bad Credentials', res: false, connect : false, success: false});
      } else {
        client.query(query)
          .then(async data =>{ 
            resolve({msg: resolveMsg, err: "", res: data.rows, connect : true, success: true})
            await client.end();
          })
          .catch(err => {
            reject({msg: rejMsg, res: false, connect : true, err: err, success: false})
          })
      }
    });
  });
  return promise;
}
