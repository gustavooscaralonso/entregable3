import express from 'express';
import  ProductManager  from './ProductManager.js';


const app = express();
app.listen(8080, () => console.log('Servidor corriendo en puerto 8080'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let pm = new ProductManager();

app.get('/',(req,res) => {
    res.send("Escuchando en puerto 8080")
})

app.get('/products', async(req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        try {
            const products = await pm.getProducts()
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error al leer el archivo' });
        }
    } else {
        const products = await pm.getProducts()
        let limiteProducts = products.slice(0, 5)
        res.send(limiteProducts)
    }
})

app.get('/products/:id',async(req,res)=>{
    let productId = req.params.id

    try {
        const product = await pm.getProductById(productId)
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'El producto no existe' });
    }
})
