import cors from "cors"
import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import express, {response} from "express"
import {process_doc} from "./lang_script";

import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(express.json())
const PORT = 9004
app.use(cors())
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'D:/ExamenDispositivosMoviles/Examen/backend/uploads')
        //callback(null, 'process.env.UPLOADS_DIRECTORY')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})
const upload = multer({
    storage,
    fileFilter(req, file, callback: multer.FileFilterCallback) {
        const fileExtension = path.extname(file.originalname)
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs ara allowed'))
        }
        callback(null, true)
    }
})

import { OpenAI} from '@langchain/openai';

const openai = new OpenAI({
    //openAIApiKey: "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",
    openAIApiKey: process.env.OPENAI_API_KEY,
});

import * as path from "path";


const generatePrompt = (numberToConvert: number) => {
    return ` Tu tienes un rol de convertidor binario y requiero que conviertes este numero ${numberToConvert} a  binario, solo regresame el binario del número sin explicaciones. Regresame la salida con el formato su numero fue X y el binario es Y. Al final calcula el numero de Tokens utilizados con el formato. El número de Tokens utilizados fue X`

}

let names = [
    {
        id: uuidv4(),
        firstName: 'Luis',
        lastName: 'Briones'
    },
    {
        id: uuidv4(),
        firstName: 'Lea',
        lastName: 'Rolfes'
    }
]
app.get("/ping", (req, res) => {
    console.log("alguien ha dado pin!!")
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})


app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body?.question) {
        return res.status(400).send()
    }
    const response = await process_doc(req.file?.filename, req.body.question)
    res.send(response)
})

app.get("/hola/:nombre/:apellido", (req, res) => {
    console.log("alguien ha dado pin!!")
    res.setHeader("Content-Type", "application/json")
    const nombre = req.params.nombre
    const apellido = req.params.apellido
    console.log("alguien ha ingresado su nombre")
    res.send({nombre, apellido})
})

app.get('/nombres', (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.send(names)
})

app.post('/nombres', (req, res) => {
    const item = {...req.body, id: uuidv4()};
    names.push(item)
    res.send(item)
})

app.post('/openapi', async (req, res) => {
    const {prompt} = req.body
    const completion = await openai.invoke(
        generatePrompt(prompt)
    )

    // @ts-ignore
    res.send({result: completion})
})

app.delete('/nombres/:id', (req, res) => {
    names = names.filter(n => n.id !== req.params.id)
    res.status(204).end()
})

app.get('/nombres/:id', (req, res) => {
    const searchedName = names.find(n => n.id === req.params.id)
    if (!searchedName)
        res.status(400).end()
    res.send(searchedName)
})

app.put('/nombres/:id', (req, res) => {
    const index = names.findIndex(n => n.id === req.params.id)
    if (index === -1)
        res.status(404).end()
    names[index] = {...req.body, id: req.params.id}
    res.status(204).end()
})
app.listen(PORT, () => {
    console.log(`running application ${PORT}`)
})


