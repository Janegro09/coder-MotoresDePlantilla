const fs = require('fs');

class Contenedor {

    constructor( nombreArchivo ){

        this.nombre     = nombreArchivo;
        this.id         = 0

    }

    crear(nombre, datos) {
        try {
            fs.writeFileSync(nombre,JSON.stringify(datos),'utf-8');
        } catch (error) {
            console.log(error)
        }
    }

    save( datos ) {
        try {
            const all = this.getAll();;
            const lastId = all[all.length -1].id +1
            const nuevo = {
                title: datos.title,
                price: datos.price,
                thumbNail: datos.thumbNail,
                id: lastId
            };
            
            all.push(nuevo);
            fs.writeFileSync(this.nombre,JSON.stringify(all),'utf-8');

            return nuevo.id;
        } catch (error) {
            console.log(error);
        }
    };

    getById( id ) {
        try {
            let arrayData = this.getAll();

            return arrayData[id-1];
        } catch (error) {
            console.log(error);
        }
    };

    getAll() {

        try {
            let data = fs.readFileSync(this.nombre,'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    };

    deleteById( idArchivo ) {
        try {
            const arrayData = this.getAll();
            this.deleteAll();
            arrayData.forEach(elem => {
                let valor = JSON.parse(elem);    
                if(valor.id != idArchivo) {
                    this.save(valor, valor.id);
                }
            });
            console.log("quitamos el elemento del archivo")

        } catch (error) {
            console.log(error);
        }

    };

    deleteAll(){
        try {
            fs.writeFileSync(this.nombre, "");
            console.log("lo limpiamos");
            
        } catch (error) {
            console.log(error);
        }
    };

}

module.exports = Contenedor;