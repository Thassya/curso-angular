const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');


const app = express(); //instancia aplicacao
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req,res)=>{
    const files = req.files;
    console.log(files);
    res.json({ mensage: files });
});

app.use((err,req,res,next)=> res.json({error: err.mensage}));

app.listen(8000, () => { console.log("listening on http://localhost:8000") });

// const port = process.env.PORT || port;
// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);
// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });
// app.listen(port, () => console.log(`listening on http://localhost:${port}`));
