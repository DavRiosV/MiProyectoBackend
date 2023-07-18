import fs from 'fs'

class ChatManager {
    constructor(path) {
        this.path = path;
        this.chats = [];
        this.init(path)
    }
    async init(path) {
        try{
            let file = fs.existsSync(path)
            if (!file) {
                fs.writeFileSync(path,'[]')
                console.log('file created at path: '+this.path)
                return 'file created at path: '+this.path
            } else {
        }
            this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        } catch(error){
            console.log(error)
            return null
        }
    } 
}
let Chats = new ChatManager('./src/data/chats.json')

export default Chats