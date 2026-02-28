const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000

app.use(bodyParser.json());

let conn = null
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8821
    })
}

//path = GET / users เก็บข้อมูลทั้งหมดในรูปแบบ JSON
app.get('/users/:id',async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (results[0].length === 0) {
            throw{ statusCode: 404, message: 'User not found' };
        }
         res.json(results[0][0]);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        let ststusCode = error.statusCode || 500;
        res.status(ststusCode).json({
            message:'Error fetching user',
            error: error.message 
        });
    }
})

app.post('/users', async (req, res) => {
    try{
     let user = req.body;
     const results = await conn.query('INSERT INTO users SET ?', user);
     console.log('results', results);
     res.json({
         message:'User created successfully',
         data: results[0]    
     });
    }catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser,id]);
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User updated successfully',
            data: updateUser
        });
    } 
    catch (error) {
        console.error('Error updating user:' ,error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({ 
            message: 'Error updating user',
            error: error.message
        });
     }
})
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User deleted successfully'
        });
    } 
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})
app.listen(port, async () => {
    await initDBConnection ();
    console.log(`Server is running on port ${port}`)
});
