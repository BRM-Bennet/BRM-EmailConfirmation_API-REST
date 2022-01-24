const dbConfig = require('./config/dbConfig.json');
const dbQueries = require('./sql/dbQueries.js');

exports.handler = async (event) => {
    const code = event.pathParameters.code;

    try {
        const emailStatus = await dbQueries.getConfirmation(code)
        const message = emailStatus ? "Email has been confirmed." : "Email could not be confirmed.";
        
        const response = {
            result: {
                statusCode: 202,
                body: {
                    message: message
                }
            }
        }
        return response

    } catch (error) {
        const response = {
            result: {
                statusCode: 500,
                body: {
                    message: "Server Error. Email was not confirmed."
                }
            }
        }
        
    }
}