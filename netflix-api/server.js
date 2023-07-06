const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const url="mongodb+srv://duplix:duplix123@cluster0.wx2bjff.mongodb.net/?retryWrites=true&w=majority"

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

