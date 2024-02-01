const jwt = require('jsonwebtoken'); // Don't forget to import the 'jsonwebtoken' library
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;


const generateToken = (payload, expiresIn = '1h') => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secretKey,
            { expiresIn },
            (err, token) => {
                if (err) {
                    reject('Token generation error');
                    console.error(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};


module.exports = generateToken;

// Example usage:
// const superadminPayload = { superadmin: /* your superadmin data here */ };
// const yourSecretKey = 'yourSecretKeyHere';


// generateToken(superadminPayload)
//     .then(token => {
//         console.log('Generated Token:', token);
//         // You can use the token as needed here
//     })
//     .catch(error => {
//         console.error('Error generating token:', error);
//     });
