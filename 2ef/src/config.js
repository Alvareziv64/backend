import fs from 'fs';

export default {

    fileSystem: {
        path: './DB'
    },

    mongodb: {
        cnxStr: "mongodb+srv://admin:mongopassword123@cluster0.xooqlno.mongodb.net/?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        },
        dbname: 'Cluster0'
        
    },

    firebase: {
         serviceAccount : JSON.parse(fs.readFileSync("../DB/coder-backend-b4f2e-firebase-adminsdk-6snu5-a80df12aee.json")),

    },
    MODO_PERSISTENCIA: 'fileSystem',
}

