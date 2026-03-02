const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000

app.use(bodyParser.json());
app.use(cors());

let users = []
let counter = 1;
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

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

app.get('/users', async(req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

app.get('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
})

// path = POST /users // การส่งข้อมูล บาง post สามารถดึงข้อมูลได้เหมือน get
app.post('/users', async (req, res) => {
    try{
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message: 'User created successfuly',
            data: results[0]   
        })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

// path = PUT /user/:id // สำหรับการแก้ไขข้อมูล
app.put('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id])
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
})


// path = DELETE /user/:id // สำหรับการลบข้อมูล
app.delete('/users/:id', async (req, res) => {
    try{
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode : 404, message: 'User not found'};
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
    await initDBConnection();
    console.log(`Server is running on port ${port}`)
});
