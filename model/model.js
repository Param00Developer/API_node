import mongoose from "mongoose";
const productModel = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please specify a name.."]
        },
        age: {
            type: Number,
            require: true
        },
        salary: {
            type: Number,
        }
    },
    { timestamps: true }
)
const Product = mongoose.model("Product_table", productModel)
export {Product}