import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.use(express.json());

/* LOG MIDDLEWARE */
app.use((req, res, next) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("📥 NEW REQUEST");
  console.log("➡️ Method:", req.method);
  console.log("➡️ URL:", req.url);
  console.log("➡️ Body:", req.body);
  console.log("➡️ Time:", new Date().toISOString());
  next();
});

/* DISCORD CLIENT */
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let botReady = false;
let cachedChannel = null;

/* READY EVENT */
client.once("ready", async () => {
  botReady = true;

  try {
    cachedChannel = await client.channels.fetch(process.env.CHANNEL_ID);

    console.log("━━━━━━━━━━━━━━━━━━━━");
    console.log(`BOT READY: ${client.user.tag}`);
    console.log("CHANNEL LOADED:", cachedChannel?.id);
    console.log("━━━━━━━━━━━━━━━━━━━━");
  } catch (err) {
    console.error("Channel fetch error:", err);
  }
});

/* EXPRESS ROUTES */
app.get("/", (req, res) => {
  console.log("GET / hit");
  res.send("Server is alive");
});

app.get("/form", (req, res) => {
  console.log("GET /form hit");
  res.send("Form endpoint exists");
});

app.post("/form", async (req, res) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("POST /form RECEIVED");

  if (!botReady || !cachedChannel) {
    console.log("Bot not ready yet");
    return res.status(503).send("Bot not ready");
  }

  try {
    console.log("Sending message to Discord...");

    const message = "Тест из Google Forms";

    await cachedChannel.send(message);

    console.log("Message sent:", message);
    console.log("━━━━━━━━━━━━━━━━━━━━");

    return res.status(200).send("OK");

  } catch (err) {
    console.log("━━━━━━━━━━━━━━━━━━━━");
    console.error("ERROR in /form:");
    console.error(err);
    console.log("━━━━━━━━━━━━━━━━━━━━");

    return res.status(500).send("Error");
  }
});

/* SERVER START */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("SERVER STARTED");
  console.log("PORT:", PORT);
  console.log("━━━━━━━━━━━━━━━━━━━━");
});

/* LOGIN */
client.login(process.env.DISCORD_TOKEN);
