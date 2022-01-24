//Local Server 
const express = require('express');
const app = express()

const cors = require('cors')
const bodyParser = require("body-parser");
app.use(express.json({ limit:'30mb', extend: true })) 
app.use(cors())
app.use(bodyParser.json());
const dbQueries = require('./sql/dbQueries.js')

app.get('/',(req, res) => {
    res.send('Hello')
})
app.post("/confirm/:code" , async (req, res) => {
    const code  = req.params.code;
    
    try {
        const emailStatus = await dbQueries.getConfirmation(code)
        console.log(emailStatus)
        if (emailStatus) {
            res.status(201).json({
                body: {
                    message: "Email Confirmed!",
                    auth: true
                }
            })
        }
        return res.status(404).json({
            body: {
                message: "Emal could not be confirmed.",
                auth: false
            }
        })

    } catch (error) {
        res.json({ message: "Server error"})
        
    }
}) 


app.listen(3000, () => {
    console.log("Server running on port 3000")
})