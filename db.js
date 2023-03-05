let mongoose = require('mongoose')

let mongoURL = "mongodb+srv://test:test1234@cluster0.lofuhf0.mongodb.net/myntra_clone?retryWrites=true&w=majority"

mongoose.connect(mongoURL)