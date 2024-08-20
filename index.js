import express from 'express';
import cors from 'cors'
import hallRouter from './Router/hallbooking.router.js'

const app = express();
const PORT =3000;
app.use(cors())
app.use(express.json())

app.use('/api', hallRouter)

//  app.get('/', (req,res)=>{
//     res.status(200).send("example")
//  })

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})