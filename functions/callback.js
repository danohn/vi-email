const swapRoles = true;
const sgMail = require("@sendgrid/mail");

exports.handler = async (context, event, callback) => {
  console.log(event);

  sgMail.setApiKey(context.SENDGRID_API_SECRET);

  const transcriptSid = event.transcript_sid;
  const client = context.getTwilioClient();

  try {
    let transcript = await client.intelligence.v2
      .transcripts(transcriptSid)
      .fetch();

    let participants = transcript.channel.participants;

    sentences = await client.intelligence.v2
      .transcripts(transcriptSid)
      .sentences.list();

    let participantMap = participants.reduce((acc, participant) => {
      if (swapRoles) {
        acc[participant.channel_participant === 1 ? 2 : 1] = participant.role;
      } else {
        acc[participant.channel_participant] = participant.role;
      }
      return acc;
    }, {});

    let concatenatedTranscripts = "";

    for (let sentence of sentences) {
      const role = participantMap[sentence.mediaChannel];
      concatenatedTranscripts += `<p><strong>${role}:</strong> ${sentence.transcript}</p>\n`;
    }

    const msg = {
      to: context.TO_EMAIL_ADDRESS,
      from: {
        name: "Voice Intelligence Transcripts",
        email: context.FROM_EMAIL_ADDRESS,
      },
      html: `${concatenatedTranscripts}`,
      subject: "New Voice Intelligence Transcript",
    };

    message = await sgMail.send(msg);
    console.log("Email sent!");
  } catch (error) {
    console.error(error);
    return callback(error);
  }

  let resp = "Email sent!";
  return callback(null, resp);
};
