import { model, Schema } from 'mongoose'

const collection  = 'carts'
const schema = new Schema({
    pid: {type:Number,required:true},
    quantity: {type:Number,required:true}
})

const Cart = model(collection,schema)
export default Cart