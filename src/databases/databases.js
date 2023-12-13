const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path : './.env'})

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })
        console.log('Database is Connected ...')
        
    } catch (error) {
        consolhashedPassword
        process.exit()
    }
}

module.exports = dbConnect;
