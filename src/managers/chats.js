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
    // Ejemplo de mensajes de chat
//     const mensajes = [
//         {
//             remitente: 'usuario1',
//             destinatario: 'usuario2',
//             contenido: 'Hola, ¿cómo estás?',
//             timestamp: '2023-05-31 10:00:00'
//         },
//         {
//             remitente: 'usuario2',
//             destinatario: 'usuario1',
//             contenido: '¡Hola! Estoy bien, gracias. ¿Y tú?',
//             timestamp: '2023-05-31 10:01:00'
//         }
//     ];
    
//     // Guardar mensajes de chat en un archivo JSON
//     const nombreArchivo = 'chat.json';
//     const datos = JSON.stringify(mensajes, null, 2);
    
//     fs.writeFile(nombreArchivo, datos, 'utf8', (err) => {
//         if (err) {
//             console.error('Error al guardar los mensajes de chat:', err);
//         } else {
//             console.log('Los mensajes de chat se han guardado en el archivo:', nombreArchivo);
//     }
// });

}
let Chats = new ChatManager('./src/data/chats.json')

export default Chats