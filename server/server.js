const express= require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

require('./config/mongoose.config')
require("./routes/request.route")(app)
require("./routes/user.route")(app)



app.listen(8000,()=> {
    console.log('listening on port 8000')
})

