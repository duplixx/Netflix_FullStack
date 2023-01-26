const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url="mongodb://duplix:duplix123@ac-hjl9uqf-shard-00-00.wx2bjff.mongodb.net:27017,ac-hjl9uqf-shard-00-01.wx2bjff.mongodb.net:27017,ac-hjl9uqf-shard-00-02.wx2bjff.mongodb.net:27017/?ssl=true&replicaSet=atlas-8zx16b-shard-0&authSource=admin&retryWrites=true&w=majority"
const userRoutes=require('./routes/userRoutes');
const app = express();

app.use(cors());
mongoose.set('strictQuery', true);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
}
);
app.use('/api/user',userRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    }
);

