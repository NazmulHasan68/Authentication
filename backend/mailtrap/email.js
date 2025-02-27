import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClientside, sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async(email , verificationToken)=>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClientside.send({
            from : sender,
            to : recipient,
            subject : "Verify your email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category : "Email Verification"
        })
        console.log("Email send successfully");
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}


export const sendWelcomeEmail = async(email, name)=>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClientside.send({
            from: sender,
            to: recipient,
            template_uuid: "4d9eb269-8ffe-4bca-8055-cc248fc18ad4",
            template_variables: {
              "company_info_name": "BD Educators",
              "name": name,
              "company_info_address": "Test_Company_info_address",
              "company_info_city": "Test_Company_info_city",
              "company_info_zip_code": "Test_Company_info_zip_code",
              "company_info_country": "Test_Company_info_country"
            }
        })

        console.log("Welcome email send Succesfully!", response);
        
    } catch (error) {
        console.log("Welcome send error");
    }
}


export const SendPasswordResetEmail = async(email, resetURl) =>{
    const recipient = [{email}]

    try {
        const response = await mailtrapClientside.send({
            from : sender,
            to : recipient,
            subject : "Reset your password",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURl),
            category : "Password Reset"
        })
    
    } catch (error) {
       console.error("Error in password reset email", error);
       throw new Error(`Error sending password reset email`, error)
    }
}



export const sendResetSuccessEmail = async(email)=>{
    const recipient = [ {email}];

    try {
        const response = await mailtrapClientside.send({
            from : sender,
            to : recipient,
            subject : "Password Reset successful",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password reset",
        })
        console.log("Password reset email sent successfully", response);
        
    } catch (error) {
        console.log(`Error sending password reset success email`,error);
        throw new Error(`Error sending password reset success email : ${error}`)
    }
}