export default async function handler(req, res) {
  // CORS configuration allowing your static site to securely connect
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const DAILY_API_KEY = "6d294c5539c2f7ae300dc1266a1502bb81be526c3a8a422eb0d61c7846651d4cd294c5539c2f7ae300dc1266a1502bb81be526c3a8a422eb0d61c7846651d4c";

  try {
    const response = await fetch("https://daily.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DAILY_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          enable_chat: false,
          start_video_off: true,  // Voice practice room setup
          start_audio_off: false,
          exp: Math.round(Date.now() / 1000) + 1800 // Room auto-expires in 30 minutes
        }
      })
    });

    if (!response.ok) {
      throw new Error("Daily configuration validation failure");
    }

    const data = await response.json();
    return res.status(200).json({ url: data.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
