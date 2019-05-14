import twilio from 'twilio';

const sendSms = (number, message, onSuccess) => {
    const client = twilio(process.env.TWILIO_ACCOUT_SID,process.env.TWILIO_AUTH_TOKEN);
    client.messages
    .create({
      from: '+61488811318',
      to: `${number}`,
      body: message,
    })
    .then(res => {
      console.log('SMS Success')
      onSucess(res)
    })
    .catch(err => {
      console.log(err);
    });

}