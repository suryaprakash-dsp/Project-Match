import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, text }) => {
    try {
        console.log("SEND EMAIL:");
        console.log("TO:", to);
        console.log("SUBJECT:", subject);
        console.log("TEXT:", text);

        if (!to) {
            throw new Error("Recipient email is missing");
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");

    } catch (error) {
        console.error("Email sending failed:", error.message);
        throw error;
    }
};

export default sendEmail;