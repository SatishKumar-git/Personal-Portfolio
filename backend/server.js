const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Test route
app.get("/", (req, res) => {
    res.send("Portfolio Contact API is Running 🚀");
});

// Contact form route
app.post("/api/contact", async (req, res) => {
    console.log("CONTACT API HIT:", req.body);
    try {
        const { name, email, subject, message } = req.body;

        // Check required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields."
            });
        }

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [process.env.EMAIL_TO],
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,

            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>New Portfolio Contact Message</h2>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Subject:</strong> ${subject}
                    </p>

                    <h3>Message:</h3>

                    <p>
                        ${message}
                    </p>
                </div>
            `
        });

        if (error) {
            console.error("Resend Error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send message."
            });
        }

        console.log("Email sent:", data);

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Email Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send message."
        });
    }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});