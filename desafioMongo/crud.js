//insert one document in products
use ecomerce
db.productos.insertOne({
    nombre: "mouse x2",
    precio: 101,
    stock: 300,
    codigo: 192837,
});

db.productos.find({});

//querys
//precio meno a 1000 $
//b.1
db.productos.find({
    precio: {
        $lt: 1000
    }
});

//db.productos.find({precio : {$gte : 1000}});
//b.2
db.productos.find({
    precio: {
        $gte: 1000,
        $lte: 6000
    }
});

//b.3
db.productos.find({ precio: { $gt: 3000 } });


//b.4
db.productos.find({}, { nombre: 1, precio: 1 }).sort({ precio: 1 }).limit(1).skip(2);
//c
db.productos.updateMany({}, { $set: { stock: 100 } })
//d
db.productos.updateMany({ precio: { $gt: 4000 } }, { $set: { stock: 0 } });
//e
db.productos.deleteMany({ precio: { $lt: 1000 } });
//6
db.createUser({"user": "CristianoRonaldo", "pwd": passwordPrompt(), "roles": [{ role : "read", db : "ecomerce"}]});