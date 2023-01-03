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
        values ('Todi', 'early morning', 3, 5, 'https://www.youtube.com/embed/gG03f74Wrws'), 
        ('Ahir Bhairav', 'early morning', 5, 7, 'https://www.youtube.com/embed/2gi6aG6DDMY'),
        ('Charukeshi', 'early morning', 7, 11, 'https://www.youtube.com/embed/_U4J6CpuNyQ'),
        ('Myaki Sarang', 'early morning', 11, 16, 'https://www.youtube.com/embed/_YsLrD_aIFk'),
        ('Puriya Danashree', 'early morning', 17, 19, 'https://www.youtube.com/embed/9X3vjQXx7xw'),
        ('Kirwani', 'early morning', 19, 23, 'https://www.youtube.com/embed/zz8KTDcn_T0'),
        ('Darbari Kanada', 'early morning', 23, 24, 'https://www.youtube.com/embed/A0w_1cOCe8s');
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
        let raganame = req.params.raganame
        let description = req.params.description
        let starttime = parseInt(req.params.starttime)
        let endtime = parseInt(req.params.endtime)
        let url = req.params.url
        sequelize.query(`
        insert into raga (raganame, description, starttime, endtime, url)
        values (?, ?, ?, ?, ?)`, {replacements:[raganame, description, starttime, endtime, url]})
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    }, 
}
