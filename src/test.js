const express = require('express');
const {promises: fs} = require('fs');
const Contenedor = require('./archivos');
const productos = new Contenedor('./src/productos.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('../public'));


app.engine('cte', async (filePath, options, callbacks) => {

    let all = productos.getAll()
    let aux = `<div class="alert alert-warning m-2 p-2">No hay productos para mostrar</div>`

    if(all) {
        if(all.length > 0) {
            aux = '';
            all.map(v => {
                aux = aux+`
                <tr>
                <th scope="row">${v.id}</th>
                <td>${v.title}</td>
                <td>${v.price}</td>
                <td><img alt="${v.title}" width="150px" src="${v.thumbNail}"></td>
                </tr>
                `
            })
        }
    }

    try {
        const content = await fs.readFile(filePath)
        const rendered = content.toString()
            .replace('^^productos$$', ''+aux+'')
        return callbacks(null, rendered)
    } catch (err) {
        return callbacks(new Error(err))
    }
})

app.set('views', './views');

app.set('view engine', 'cte');

app.get('/', express.static('public'));

app.post('/productos', (req, res) => {
    const {title, price, thumbNail} = req.body;
    const adjunto = {
        title,
        price,
        thumbNail
    }
    const id = productos.save(adjunto);
    
    res.redirect('/')

})

app.get('/productos', (req, res) => {
    res.render('plantilla')
})

app.get('/cte2', (req, res) => {
    const datos = {
        titulo: 'cte2',
        mensaje: 'mensaje de cte2',
        autor: 'autor de cte2',
        version: 'v2'
    }

    res.render('plantillas', datos)
})

app.listen(8081)