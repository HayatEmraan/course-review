import express, { Application } from 'express'
import cors from 'cors'
import { router } from './app/routes/routes'
import { globalErrorHandler } from './app/errors/globalErrorHandler'
const app: Application = express()

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// routes middleware

app.use('/api', router)

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'route not found',
    message: `Can't find ${req.originalUrl} on this server!`,
  })
})

app.use(globalErrorHandler)

export default app
