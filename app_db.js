import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import { Product } from './model/model.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to data base");
        app.listen(5000, () => {
            console.log("Server is running")
        })
    })
    .catch((err) => {
        console.log(`Sorry some error occured :${err}`)
})

/*Controller to Create data into database */
app.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const added_pro = await Product.create(req.body)
        res.status(200).json(added_pro)
    } catch (err) {
        res.status(500).json({ "Error_Message": err.message })
    }
})

/*Controller to Read data based on id from database */
app.get("/:id", async (req, res) => {
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        res.status(200).json({"Data":product})
    } catch (err) {
        res.status(500).json({ "Error_Message": err.message })
    }
})

/*Controller to upadte data based on id from database */
app.put("/:id", async (req, res) => {
    try {
        const {id}=req.params
        const u_product=await Product.findByIdAndUpdate(id,req.body)
        if(!u_product){
            return res.status(404).json("Invalid Id provided..")
        }
        res.status(200).json({"Updated_Data":u_product})
    } catch (err) {
        console.log(err)
        res.status(500).json({ "Error_Message": err })
    }
})

/*Controller to delete data based on id from database */
app.delete("/:id", async (req, res) => {
    try {
        const {id}=req.params
        const u_product=await Product.findByIdAndDelete(id,req.body)
        if(!u_product){
            return res.status(404).json("Invalid Id provided..")
        }
        res.status(200).json("Data was successfuly deleted..")
    } catch (err) {
        console.log(err)
        res.status(500).json({ "Error_Message": err })
    }
})