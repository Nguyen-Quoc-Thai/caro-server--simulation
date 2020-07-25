const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

// PORT
const PORT = process.env.PORT || 8080

// DB
const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// Route
app.post('/send', (req, res) => {

    const {action} = req.body

        switch(action){

            case "newgame": {

                const {API_KEY, matrix} = req.body
                console.log({API_KEY, action, matrix})

                if(API_KEY && action && matrix){

                    try {

                        const  data = db.get("gameStart").find(game => game.API_KEY === API_KEY).value()
                        const index = db.get("positionSend").value().indexOf(data)

                        data.matrix = matrix

                        let  newData = db.get("gameStart").value()
                        newData.splice(index, 1, data)
                        db.set("gameStart", newData).write()

                        if(data)
                            return res.send({status: "successfully", gameid: data.gameId})

                    } catch (error) {

                        console.log("Server error: " + error.message)
                        return res.send("\nRequest failed: Please checking your request data (┬┬﹏┬┬)")
                    }
                }

                break;
            }

            case "sendposition": {

                const {API_KEY, position, player} = req.body
                console.log({API_KEY, action, position, player})

                if(API_KEY && position && player){

                    try {

                        const  data = db.get("positionSend").find(game => (game.API_KEY === API_KEY && game.player === player)).value()
                        const index = db.get("positionSend").value().indexOf(data)

                        const  gameId = db.get("gameStart").find(game => game.API_KEY === API_KEY).value().gameId

                        data.player = player
                        data.matrix.push(position)

                        let newData = db.get("positionSend").value()
                        newData.splice(index, 1, data)
                        db.set("positionSend", newData).write()

                        const  matrixUser = db.get("positionSend").find(game => (game.API_KEY === API_KEY && game.player === player)).value().matrix

                        if(data)
                            return res.send({status: "successfully", gameid: gameId, matrix: matrixUser})
                    } catch (error) {

                        console.log("Server error: " + error.message)
                        return res.send("\nRequest failed: Please checking your request data (┬┬﹏┬┬)")
                    }
                }

                break;
            }

            case "getposition": {

                const {API_KEY, gameid} = req.body
                console.log({API_KEY, action, gameid})

                if(API_KEY && gameid){

                    try {

                        const  data = db.get("positionSend").value().filter(game => game.API_KEY === API_KEY && game.gameid === gameid)

                        if(data)
                            return res.send({status: "successfully", gameid: gameid, matrix: [...data[0].matrix, ...data[1].matrix]})
                    } catch (error) {

                        console.log("Server error: " + error.message)
                        return res.send("\nRequest failed: Please checking your request data (┬┬﹏┬┬)")
                    }
                }

                break;
            }
        }

    return res.send({})
})


// Listen
app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}`))