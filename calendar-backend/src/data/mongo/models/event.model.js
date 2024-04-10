import { Schema, model } from "mongoose";


const EventoSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, 'Start is required']
  },
  end: {
    type: Date,
    required: [true, 'End is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'Usuario es requerido hable con el administrador']
  },
})

EventoSchema.method('toJSON', function() {
  const { _id, __v, ...object } = this.toObject()
  object.id = _id
  return object
})

export const EventModel = model('Evento', EventoSchema);

