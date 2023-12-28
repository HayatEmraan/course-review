import { Schema, model } from 'mongoose'
import { THistory } from './history.type'

const historySchema = new Schema<THistory>({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  changeAt: Date,
})

export const HistoryModel = model<THistory>('History', historySchema)
