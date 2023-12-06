const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true       
    },
    date: {
        type: String,
        require: true
    },
    adult: {
        type: Number,
        require: true
    },
    child: {
        type: Number,
        require: true
    },
    fee: {
        type: Number,
        require: true
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket