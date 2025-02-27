import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClientside = new MailtrapClient({ token: TOKEN });

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "BD Educator",
};



