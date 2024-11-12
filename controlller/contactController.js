const Contact = require("../model/contact");
const nodemailer = require("nodemailer")

module.exports.saveContactDetails = async (req, res) => {
    try {
        const { name, lastname, email, subject, notes } = req.body;
        const newContactDetail = new Contact({
            name, email, lastname, subject, notes
        })
        console.log("new_contact", newContactDetail)
    } catch (err) {
        console.log(err)
    }
}

module.exports.contactMail = async (req, res) => {
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