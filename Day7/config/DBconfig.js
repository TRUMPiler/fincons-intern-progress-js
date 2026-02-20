const mongoose = require('mongoose');
/**
 * DBconfig: simple MongoDB connection helper.
 * - call connect() to establish a connection using process.env.MONGODB URI.
 * - returns the mongoose connection object.
 */
class DBconfig{
        async connect()   
        {
            try
            {
                let uri=process.env.MONGODB+''
            await mongoose.connect(uri,{
                dbName:'ToDoApp'
            })
                .then(() => console.log('Connected to MongoDB'))
                .catch(err => console.error('Error connecting to MongoDB:', err));
                return await mongoose.connection;
            }
            catch(Exception)
            {
                throw new Error(Exception);
            }
    }
}
module.exports = DBconfig;