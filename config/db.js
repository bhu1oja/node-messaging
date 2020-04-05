module.exports = {
    //for local mongo
    // mongoURI : "mongodb://localhost:27017/node_chat"

    //for global mongo db,  you can use your own
    mongoURI :process.env.mongoURI || "mongodb+srv://bhuwan:79ftftffIhhxDy5h@cluster0-ki4jv.mongodb.net/test?retryWrites=true&w=majority"
};