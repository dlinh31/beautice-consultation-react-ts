import client from './ConnectDBControllers';

const queryAll = async ( table: string) => {
  try {
    const result = await client.query(`SELECT * FROM "${table}";`);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw err;  // Rethrow or handle as needed
  }
};

const findExistingUsername = async (username: string) => {
    try {
        const result = await client.query(`SELECT * FROM users WHERE username='${username}';`);
        return result.rows.length > 0;
      } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;  // Rethrow or handle as needed
      }
}

const SignUpUser = async(req, res) => {
    const { username, password } = req.body;

    const usernameExist = await findExistingUsername(username);
    if (usernameExist){
        console.log("Username already existed")
        res.status(400).send("Username already existed.")
    }
    else{
        try {
            const result = await client.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`);
            res.status(200).send(result)
          } catch (err) {
            console.error('Error executing query', err.stack);
            throw err;  // Rethrow or handle as needed
          }
    }
    
}


const SignInUser = async(req,res) => {
    const { username, password } = req.body;
    try {
        const result = await client.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}';`);
        res.status(200).send(result);
      } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(400).send(err)
      }
}

module.exports = {
    SignUpUser,
    SignInUser
}