import express from'express';

import dotenv from 'dotenv';

dotenv.config()
const app = express();

const PORT= process.env.PORT || 2000;
app.get('/', (req,res) =>{

})

app.listen(prompt, () => {
    console.log(`server is running on port ${PORT}`);
    
})