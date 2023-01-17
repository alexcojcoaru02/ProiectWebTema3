const configuration  = require('./config/configuration.json');
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')

const DB_NAME = configuration.database.database_name;
const DB_USER = configuration.database.username;
const DB_PASS = configuration.database.password;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'sqlite'
});

class User extends Sequelize.Model { };

User.init({
    
    nume:{
        type: Sequelize.STRING,
        allowNull: false
    },
    prenume:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        primaryKey:true,
    },
    parola: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'users'
});

class Feedback extends Sequelize.Model { };

Feedback.init({
    identifier: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    plecare:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sosire:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mijloc_transport: {
        type: Sequelize.STRING,
        allowNull: false
    },
    linie:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ora_plecare:{
        type: Sequelize.STRING,
        allowNull: false
    },
    durata:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grad_aglomeratie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observatii:{
         type: Sequelize.TEXT,
        allowNull: false
    }
    
}, {
    sequelize,
    modelName: 'feedback'
});

Feedback.belongsTo(User);
User.hasMany(Feedback);

User.sync();
Feedback.sync();

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.get('/getAllUsers', async (req, res) => {
	try{
		let users = await User.findAll()
		res.status(200).json(users)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.post('/register', async (req, res) => {
    const user = req.body;
    if(user.nume && user.prenume && user.email&&user.parola) {
        User.findOne({where: {email: user.email}}).then(result => {
            if(result) {
               res.status(409).send({
                   message: "User already exists"
               }) 
            } else {
                User.build(user).save().then(user => {
                    res.status(201).send({
                        message: "User created successfully"
                    });
                })
            }
        })
    } else {
        res.status(400).send({
            message: 'Missing user fields'
        });
    }

})

app.post('/login', (request, response) => {
    const credentials = request.body;
    User.findOne({where: {email: credentials.email, parola: credentials.parola}}).then(result => {
        if(result) {
            response.status(200).send(result);
        } else {
            response.status(404).send({
                message: 'Invalid credentials'
            })
        }
    })
})

app.get('/getAllFeedback', async (req, res) => {
	try{
		let feedback = await Feedback.findAll()
		res.status(200).json(feedback)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.post('/createFeedback', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await Feedback.bulkCreate(req.body)
			res.status(201).json({message : 'Feedback created'})
		}
		else{
			await Feedback.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/users/:email', async (req, res) => {
	try{
		let user = await User.findByPk(req.params.email)
		if (user){
			res.status(200).json(user)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/users/:email', async (req, res) => {
	try{
		let user = await User.findByPk(req.params.email)
		if (user){
			await user.update(req.body)
			res.status(202).json({message : 'Successfully updated'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/deleteUser/:email', async (req, res) => {
	try{
		let user = await User.findByPk(req.params.email);
		if (user){
			await user.destroy()
			res.status(202).json({message : 'Successfully deleted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/getAllFeedbackByEmail/:userEmail', async (req, res) => {

try
	{
		const userEmail=req.params.userEmail;
	if(userEmail)
	{
		const feedback = await Feedback.findAll({where:{userEmail:userEmail}});
            res.status(200).json(feedback);
	
       
    } else {
        res.status(404).json({
            message: "not found"
        })
    }
	}catch(err)
	{
		console.warn(err)
		res.status(500).json({message : 'server error'})
	}
})



app.get('/feedback/:plecare', async (req, res) => {
    try
	{
		const plecare=req.params.plecare;
	if(plecare)
	{
		const feedback = await Feedback.findAll({where:{plecare:plecare}});
            res.status(200).json(feedback);
	
       
    } else {
        res.status(404).json({
            message: "not found"
        })
    }
	}catch(err)
	{
		console.warn(err)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/feedbackByMijlocTransport/:mijlocT', async (req, res) => {
    try
	{
		const mijloc=req.params.mijlocT;
	if(mijloc)
	{
		const feedback = await Feedback.findAll({where:{mijloc_transport:mijloc}});
            res.status(200).json(feedback);
	
       
    } else {
        res.status(404).json({
            message: "not found"
        })
    }
	}catch(err)
	{
		console.warn(err)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/feedback1/:linie', async (req, res) => {
    try
	{
		const linie=req.params.linie;
	if(linie)
	{
		const feedback = await Feedback.findAll({where:{linie:linie}});
            res.status(200).json(feedback);
	
       
    } else {
        res.status(404).json({
            message: "not found"
        })
    }
	}catch(err)
	{
		console.warn(err)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/feedback/delete', (req, resp) => {
    const criteria = req.body;
    if(criteria.userEmail && criteria.identifier) {
        Feedback.destroy({where: criteria}).then(result => {
            if(result) {
                resp.status(200).send({
                    message: 'Successfully deleted'
                });
            } else {
                resp.status(200).send({
                    message: 'No records found matching the criteria'
                })
            }
        }).catch(err => {
            resp.status(500).send(err);
        })
    } else {
        resp.status(400).send({
            message: 'Invalid payload'
        })
    }
})



app.listen(8080, () => {
    console.log('Server started on port 8080...');
   
})