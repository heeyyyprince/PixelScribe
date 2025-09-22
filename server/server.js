import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';
import enhanceRouter from './routes/enhanceRoutes.js';
import chatRouter from './routes/chatRoutes.js';

// App Config
const PORT = process.env.PORT || 4000
const app = express();
await connectDB()

// Intialize Middlewares
app.use(express.json())
app.use(cors({
  origin: true, // reflect request origin
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','token'],
}))

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.use('/api/enhance',enhanceRouter)
app.use('/api/chat', chatRouter)

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
