import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'a0533190528@gmail.com',
        pass: 'ayala111',
    },
});

export async function sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: 'a0533190528@gmail.com',
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}