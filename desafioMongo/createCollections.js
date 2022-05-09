use ecomerce
db.createCollection("productostest3", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "nombre",
                "precio",
                "stock",
                "codigo"
            ],
            properties: {
                nombre:
                    {
                        bsonType: "string"
                    },
                precio:
                    {
                        bsonType: "int",
                        minimum : 100,
                        maximum : 5000
                    },
                stock:
                    {
                        bsonType: "int"
                    },
                codigo:
                    {
                        bsonType: "int"
                    }

            }
        }
    }
});

db.createCollection("mensajes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "fecha",
                "mensaje",
                "email"
            ],
            properties: {
                fecha:
                    {
                        bsonType: "date"
                    },
                mensaje:
                    {
                        bsonType: "string"
                    },
                email:
                    {
                        bsonType: "string"
                    },

            }
        }
    }
});