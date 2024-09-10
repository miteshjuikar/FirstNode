const User = require("../models/user")

async function handleGetAllUsers(req, res){
    const allDBUsers = await User.find({});
    const html = `<ul>
                    ${allDBUsers.map((user) => 
                        `<li>${user.firstName}</li>`).join("")}
                  </ul>`;    
    return res.send(html); 
}

async function handleCreateUser(req, res) {
    //create new user
    const body = req.body;
    console.log(req);
    
    
    if(!body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.jobTitle ||
        !body.gender
    ){
        return res.status(400).json({msg: "All feild are requied"});
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender
    })
    console.log(result);
    
    return res.status(201).json({msg: "Success"});
}

async function handleGetUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user);
    
    if(!user) return res.status(404).json({ error: "User not found"})
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    //Edit user with id
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, {firstName: body.firstName, lastName: body.lastName, email:body.email, jobTitle: body.jobTitle, gender: body.gender});
    return res.json({ Status: `${req.params.id} get updated with new entry`});
}

async function handleDeleteUserById(req, res) {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ Status: 'Entry Deleted'});
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}