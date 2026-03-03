import twilio from "twilio";

const getClient = () =>
  twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Send SMS alert to emergency responders
 * @param {string} to - Phone number (e.g. "+919876543210")
 * @param {object} incident - Incident data
 * @param {object} hospital - Nearest hospital data
 */
export const sendSMSAlert = async (to, incident, hospital) => {
  try {
    const mapsLink = `https://www.google.com/maps?q=${incident.location.lat},${incident.location.lng}`;
    const body = [
      `🚨 SADAK SURAKSHA EMERGENCY ALERT`,
      ``,
      `Accident reported!`,
      `📍 Location: ${mapsLink}`,
      `⚠️ Severity: ${incident.severity}`,
      `📊 Confidence: ${(incident.confidence * 100).toFixed(0)}%`,
      `🕐 Time: ${new Date(incident.timestamp).toLocaleString("en-IN")}`,
      ``,
      hospital
        ? `🏥 Nearest Hospital: ${hospital.name} (${(hospital.distance_meters / 1000).toFixed(1)} km away)`
        : `🏥 Searching for nearest hospital...`,
      ``,
      `Please respond immediately.`
    ].join("\n");

    const message = await getClient().messages.create({
      from: process.env.TWILIO_SMS_NUMBER || process.env.TWILIO_WHATSAPP_NUMBER?.replace("whatsapp:", ""),
      to,
      body
    });

    console.log(`SMS alert sent to ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`SMS alert failed to ${to}:`, error.message);
    return null;
  }
};

/**
 * Send WhatsApp alert to a number
 */
export const sendWhatsAppAlert = async (to, incident, hospital) => {
  try {
    const mapsLink = `https://www.google.com/maps?q=${incident.location.lat},${incident.location.lng}`;
    const body = [
      `🚨 *SADAK SURAKSHA EMERGENCY ALERT*`,
      ``,
      `Accident reported!`,
      `📍 Location: ${mapsLink}`,
      `⚠️ Severity: ${incident.severity}`,
      `📊 Confidence: ${(incident.confidence * 100).toFixed(0)}%`,
      `🕐 Time: ${new Date(incident.timestamp).toLocaleString("en-IN")}`,
      ``,
      hospital
        ? `🏥 Nearest Hospital: *${hospital.name}*\n📏 Distance: ${(hospital.distance_meters / 1000).toFixed(1)} km\n📍 Hospital: ${hospital.maps_link}`
        : `🏥 Searching for nearest hospital...`,
      ``,
      `⚡ Please respond immediately.`
    ].join("\n");

    const whatsappTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;

    const message = await getClient().messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: whatsappTo,
      body
    });

    console.log(`WhatsApp alert sent to ${to}: ${message.sid}`);
    return message;
  } catch (error) {
    console.error(`WhatsApp alert failed to ${to}:`, error.message);
    return null;
  }
};

export default { sendSMSAlert, sendWhatsAppAlert };
