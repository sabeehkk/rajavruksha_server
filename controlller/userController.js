const User = require("../model/user")

// module.exports.index = async (req, res) => {
//     try {
//         const allUsers = await User.find({})
//         console.log("allusers", allUsers)
//         res.status(200).json(allUsers)
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "error fetching users" })
//     }
// }

const createNewForm = async (req, res) => {
    try {
        const { name, email, contact_no } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Please upload a file." })
            }
        const newUser = new User({
            name,
            email,
            contact_no,
            file: {
                filename: file.filename,
                path: file.path
            }
        })
        await newUser.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports={
    createNewForm  
} 