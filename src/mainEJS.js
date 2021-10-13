const express = require('express');
const {promises: fs} = require('fs');
const Contenedor = require('./archivos');
const productos = new Contenedor('./src/productos.json');

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port = 8081;

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', req.query)
})
app.get('/productos', (req, res) => {
    let all = productos.getAll();

    res.render('productos', {all:all})
})

app.post('/productos', (req, res) => {
    const {title, price, thumbNail} = req.body;
    const adjunto = {
        title,
        price,
        thumbNail
    }
    const id = productos.save(adjunto);
    
    res.render('index')

})

const server = app.listen(port, () => {
    console.log(`Corriendo en http://localhost:${port}`)
  });

server.on('error', error => console.log(`Error en servidor ${error}`));

  


// app.engine('cte', async (filePath, options, callbacks) => {

//     let all = productos.getAll()
//     let aux = `<div class="alert alert-warning m-2 p-2">No hay productos para mostrar</div>`

//     if(all) {
//         if(all.length > 0) {
//             aux = '';
//             all.map(v => {
//                 aux = aux+`
//                 <tr>
//                 <th scope="row">${v.id}</th>
//                 <td>${v.title}</td>
//                 <td>${v.price}</td>
//                 <td><img alt="${v.title}" width="150px" src="${v.thumbNail}"></td>
//                 </tr>
//                 `
//             })
//         }
//     }

//     try {
//         const content = await fs.readFile(filePath)
//         const rendered = content.toString()
//             .replace('^^productos$$', ''+aux+'')
//         return callbacks(null, rendered)
//     } catch (err) {
//         return callbacks(new Error(err))
//     }
// })

// app.set('views', './views');

// app.set('view engine', 'cte');

// app.get('/', express.static('public'));

// app.post('/productos', (req, res) => {
//     const {title, price, thumbNail} = req.body;
//     const adjunto = {
//         title,
//         price,
//         thumbNail
//     }
//     const id = productos.save(adjunto);
    
//     res.redirect('/')

// })

// app.get('/productos', (req, res) => {
//     res.render('plantilla')
// })

// app.get('/cte2', (req, res) => {
//     const datos = {
//         titulo: 'cte2',
//         mensaje: 'mensaje de cte2',
//         autor: 'autor de cte2',
//         version: 'v2'
//     }

//     res.render('plantillas', datos)
// })
