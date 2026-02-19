const mongoose = require('mongoose');
class DBconfig{
        async connect()   
        {
            let uri=process.env.MONGODB+''
          await mongoose.connect(uri)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error connecting to MongoDB:', err));
            return await mongoose.connection;
        }
}
module.exports = DBconfig;