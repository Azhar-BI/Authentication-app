import nodemailer from "nodemailer";
import {
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD,
	EMAIL_FROM
} from "$env/static/private";

const transporter = nodemailer.createTransport({
	host: EMAIL_SERVER_HOST,
	port: Number(EMAIL_SERVER_PORT),
	secure: false,
	auth: {
		user: EMAIL_SERVER_USER,
		pass: EMAIL_SERVER_PASSWORD
	}
});

export async function sendVerificationEmail(email: string, token: string, baseUrl: string) {
	const verifyUrl = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

	await transporter.sendMail({
		from: EMAIL_FROM,
		to: email,
		subject: "Verify your email - AuthFlow",
		html: `
			<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
				<h2>Verify your email</h2>
				<p>Click the link below to verify your email address:</p>
				<a href="${verifyUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
					Verify Email
				</a>
				<p style="color: #666; font-size: 14px; margin-top: 16px;">
					If you didn't create an account, you can ignore this email.
				</p>
			</div>
		`
	});
}

export async function sendPasswordResetEmail(email: string, token: string, baseUrl: string) {
	const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

	await transporter.sendMail({
		from: EMAIL_FROM,
		to: email,
		subject: "Reset your password - AuthFlow",
		html: `
			<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
				<h2>Reset your password</h2>
				<p>Click the link below to reset your password:</p>
				<a href="${resetUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">
					Reset Password
				</a>
				<p style="color: #666; font-size: 14px; margin-top: 16px;">
					If you didn't request a password reset, you can ignore this email. The link expires in 1 hour.
				</p>
			</div>
		`
	});
}
