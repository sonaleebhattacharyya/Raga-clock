require('dotenv').config()
//destructure the connection string 
const {CONNECTION_STRING} = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists raga;
        create table raga (
            ragaid serial primary key, 
            raganame text, 
            description text, 
            starttime integer, 
            endtime integer, 
            url text
        ); 
        insert into raga (raganame, description, starttime, endtime, url)
        values 
        ('Malkauns', 'Midnight', 0, 2, 'https://www.youtube.com/embed/YLSGDNBMNAo'),
        ('Darbari Kanhara', 'Midnight', 0, 2, 'https://www.youtube.com/embed/lBCyMbeJy8M'), 
        ('Shahana', 'Midnight', 0, 2, 'https://www.youtube.com/embed/HLSDFXjd5pQ'),
        ('Adana', 'Midnight', 0, 2, 'https://www.youtube.com/embed/AM52Uy4QFIo'),
        ('Sohini', 'Pre-dawn', 2, 4, 'https://www.youtube.com/embed/ZtlL4icOuk4'),
        ('Paraj', 'Pre-dawn', 2, 4, 'https://www.youtube.com/embed/jXuizslcZQs'),
        ('Bhatiyar', 'Dawn', 4, 6, 'https://www.youtube.com/embed/FR9RjibJu_0'),
        ('Lalit', 'Dawn', 4, 6, 'https://www.youtube.com/embed/smYksULTb4I'),
        ('Bhairav', 'Early Morning', 6, 8, 'https://www.youtube.com/embed/JUN314mwb90'),
        ('Ramkali', 'Early Morning', 6, 8, 'https://www.youtube.com/embed/ewdxL8vmXoM'),
        ('Jogia', 'Early Morning', 6, 8, 'https://www.youtube.com/embed/DQtw8hYTOgc'),
        ('Todi', 'Morning', 8, 10, 'https://www.youtube.com/embed/bjB4YJS-2ro'), 
        ('Ahir Bhairav', 'Morning', 8, 10, 'https://www.youtube.com/embed/2gi6aG6DDMY'),
        ('Charukeshi', 'Morning', 8, 10, 'https://www.youtube.com/embed/_U4J6CpuNyQ'),
        ('Bilaskani Todi', ' Morning', 8, 10, 'https://www.youtube.com/embed/-l08FqCMtHc'),
        ('Komal Rishabh Asavari', 'Morning', 8, 10, 'https://www.youtube.com/embed/ty-OTb4bbBc'),
        ('Myaki Sarang', 'Late Morning', 10, 12, 'https://www.youtube.com/embed/4101bmauQlI&t=1s'),
        ('Deshkar', 'Late Morning', 10, 12, 'https://www.youtube.com/embed/5p2IUDczkrM'),
        ('Alahiya-Bilawal', 'Late Morning', 10, 12, 'https://www.youtube.com/embed/uiFTx-omFKE'),
        ('Jaunpuri', 'Late Morning', 10, 12, 'https://www.youtube.com/embed/ErjaDIxKaQw'),
        ('Brindavani Sarang', 'Early Afternoon', 12, 14, 'https://www.youtube.com/embed/1jzXArmSYRo'),
        ('Shuddha Sarang', 'Early Afternoon', 12, 14, 'https://www.youtube.com/embed/PpoLmkkkHdM'),
        ('Gaud Sarang', 'Early Afternoon', 12, 14, 'https://www.youtube.com/embed/FrSCKDYet3s'),
        ('Bhimpalasi', 'Late Afternoon', 14, 16, 'https://www.youtube.com/embed/Vfy_7Yce9U4'),
        ('Multani', 'Late Afternoon', 14, 16, 'https://www.youtube.com/embed/Oe_81EQZCys'),
        ('Poorvi', 'Dusk', 16, 18, 'https://www.youtube.com/embed/GliPMKNLTls'),
        ('Shree', 'Dusk', 16, 18, 'https://www.youtube.com/embed/9Xy3j2EiVPw'),
        ('Patdeep', 'Dusk', 16, 18, 'https://www.youtube.com/embed/fFdAR6znIlY'),
        ('Puriya Dhanashree', 'Dusk', 16, 18, 'https://www.youtube.com/embed/1VG43arwqvs'),
        ('Yaman', 'Evening', 18, 20, 'https://www.youtube.com/embed/q5trNs7M3MU&t=160s'),
        ('Puriya', 'Evening', 18, 20, 'https://www.youtube.com/embed/WLlheMpy7Bg'),
        ('Shuddha-Kalyan', 'Evening', 18, 20, 'https://www.youtube.com/embed/7lM4q2ztcfY'),
        ('Hameer', 'Evening', 18, 20, 'https://www.youtube.com/embed/dTbY0FdrmLU'),
        ('Kirwani', 'Late Evening', 20, 22, 'https://www.youtube.com/embed/ukDL51BVyqo'),
        ('Jaijaiwanti', 'Late Evening', 20, 22, 'https://www.youtube.com/embed/O5igSEg7yvA'),
        ('Kedar', 'Late Evening', 20, 22, 'https://www.youtube.com/embed/OSVSiZCUwng'),
        ('Durga', 'Late Evening', 20, 22, 'https://www.youtube.com/embed/lr65-YAwRCU'),
        ('Desh', 'Late Evening', 20, 22, 'https://www.youtube.com/embed/BgJ456m5ZSU'),
        ('Bihag', 'Night', 22, 24, 'https://www.youtube.com/embed/8hikEWBJElc'),
        ('Bageshri', 'Night', 22, 24, 'https://www.youtube.com/embed/E75SfJgCyoE'),
        ('Shankara', 'Night', 22, 24, 'https://www.youtube.com/embed/jbm9BBvqdak'),
        ('Chandrakauns', 'Night', 22, 24, 'https://www.youtube.com/embed/9I9mj7xNh34')
        `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    }, 
    getRagas: (req, res) => {
        let {
            starttime, endtime
        } = req.params
        console.log(starttime, endtime)
        sequelize.query(`select ragaid, raganame, starttime, endtime from raga where starttime>=? and endtime <=?`, {
            replacements:[starttime, endtime]
        })
            .then(dbRes => res.status(200).send(dbRes[0]))
            .catch(err => console.log(err));
    }, 
    getRagaDetails: (req, res) => {
        let ragaid = parseInt(req.params.ragaid)
        sequelize.query(`select * from raga where ragaid = ?`, {replacements:[ragaid]})
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err));
    },

    postRaga: (req, res) => {
        let raganame = req.body.body.raganame
        let description = req.body.body.description
        let starttime = parseInt(req.body.body.starttime)
        let endtime = parseInt(req.body.body.endtime)
        let url = req.body.body.url
        sequelize.query(`
        insert into raga (raganame, description, starttime, endtime, url)
        values (?, ?, ?, ?, ?)`, {replacements:[raganame, description, starttime, endtime, url]})
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },  
    
    putRaga: (req, res) => {
        let raganame = req.body.body.raganame
        let description = req.body.body.description
        let id = req.body.body.id
        sequelize.query(`
        update raga set raganame = ?, description = ? where id = ?`, {replacements:[raganame, description, id]})
        .then(() => {
            console.log('put succeeded')
            res.sendStatus(200)
        })
        .catch(err => console.log('error in put request', err))
    }, 
}
