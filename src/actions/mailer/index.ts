'use server'
import nodemailer from 'nodemailer'

export const onMailer = (email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    to: email,
    subject: 'Suporte em tempo real',
    text: 'Um de seus clientes no Avontz-chat acabou de mudar para o modo em tempo real',
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('E-mail enviado: ' + info.response)
    }
  })
}