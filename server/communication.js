const nodemailer = require("nodemailer");
const accountSid = process.env.SID;
const authToken = process.env.TWILIOAUTH;
const client = require('twilio')(accountSid, authToken);

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'adolf42@ethereal.email',
        pass: 'vTYd8X2Sv19d9Szk5z'
    }
});

async function informarNuevoUsuario(data) {
    const mailOptions = {
        from: 'Ecommerce Api',
        to: 'adolf42@ethereal.email',
        subject: 'Nuevo usuario',
        html: `<h1>Nuevo usuario</h1>
               <p>Usuario: ${data.username}</p>
               <p>Nombre: ${data.nombre}</p>
               <p>Edad: ${data.edad}</p>
               <p>Telefono: ${data.telefono}</p>
               <p>Direccion: ${data.direccion}</p>`,
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (e) {
        throw(e);
    }
}

async function enviarWhatsappsCompra(usuario, numeroUsuario, productos) {
    try {
        await client.messages.create({
            body: `Nuevo pedido de ${usuario}`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+59892273089'
        });
    } catch (e) {
        throw(e);
    }

    if(numeroUsuario.length > 0) {
        try{
            const msg2 = await client.messages
                .create({
                    body: `Se ha recibido su pedido.`,
                    from: 'whatsapp:+14155238886',
                    to: `whatsapp:${numeroUsuario}`
                });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }
    }
    const mailOptions = {
        from: 'Ecommerce Api',
        to: 'adolf42@ethereal.email',
        subject: `Nuevo pedido de ${usuario}`,
        html: `<h1>Nuevo Pedido</h1>
               <div>${productos}</div>`,
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (e) {
        throw(e);
    }
}

module.exports = {informarNuevoUsuario, enviarWhatsappsCompra};
