const express = require('express');
const bodyParser = require('body-parser');
const app =express();
const port = 8000
app.use(bodyParser.json());
let users =[]
let counter = 1;

app.get('/users', (req, res) => {
    res.json(users);
});

//path = POST
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message: 'User added successfully',
        user: user});
})

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;
    let seletedIndex = users.findIndex(user => user.id == id);
    if(updatedUser.name){
        users[seletedIndex].name = updatedUser.name;
    }
    if(updatedUser.email){
        users[seletedIndex].email = updatedUser.email;
    }

    )

    users[seletedIndex].name = updatedUser.name || users[seletedIndex].name;
    users[seletedIndex].email = updatedUser.email || users[seletedIndex].email;

    res.json({
         message: 'User updated successfully',
        data:{
            user: updatedUser,
            indexUpdated: seletedIndex
        }
    });
})
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let seletedIndex = users.findIndex(user => user.id == id);
    delete users[seletedIndex];
    users.splice(seletedIndex, 1);

    res.json({  
        message: 'User deleted successfully',
        indexDeleted: seletedIndex
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});