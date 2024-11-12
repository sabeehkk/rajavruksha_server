const User = require("../model/user")


const createNewForm = async (req, res) => {
    try {
        const { name, email, contact_no } = req.body;
        console.log(req.body,'incoming datas');
       let contact_num=parseInt(contact_no)
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Please upload a filess." })
        }
        const newUser = new User({
            name,
            email,
            contact_num,
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


const contactMail = async (req, res) => {
    const { name, lastName, email, message, phone_no } = req.body;
    console.log("req_body", req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sabeehkadungalloor525@gmail.com',
            pass: 'tefzmeicpgbqmnla',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        // to: "mail@defencehousingsociety.com",
        to: `${email}`,
        subject: `New Contact Request from ${name} ${lastName}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">New Contact Request</h2>
                <p><strong>Name:</strong> ${name} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone No:</strong> ${phone_no}</p>
                <h3 style="color: #555;">Message:</h3>
                <p style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">${message}</p>
            </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message. Please try again later.');
    }
}

module.exports={
    contactMail,
    createNewForm
}