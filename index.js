import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.use(express.json());

// лог всех входящих запросов (очень полезно)
app.use((req, res, next) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("📥 NEW REQUEST");
  console.log("➡️ Method:", req.method);
  console.log("➡️ URL:", req.url);
  console.log("➡️ Body:", req.body);
  console.log("➡️ Time:", new Date().toISOString());
  next();
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log(`🤖 BOT READY: ${client.user.tag}`);
});

/* HEALTH CHECK */
app.get("/", (req, res) => {
  console.log("🏠 GET / hit");
  res.send("Server is alive");
});

app.get("/form", (req, res) => {
  console.log("📄 GET /form hit");
  res.send("Form endpoint exists");
});

/* MAIN ENDPOINT */
app.post("/form", async (req, res) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("📩 POST /form RECEIVED");

  try {
    console.log("🔍 Fetching channel...");
    console.log("CHANNEL_ID:", process.env.CHANNEL_ID);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    if (!channel) {
      console.log("❌ Channel not found");
      return res.status(500).send("Channel not found");
    }

    console.log("✅ Channel found:", channel.id);
    console.log("📤 Sending message to Discord...");

    const message = "Тест из Google Forms";

    await channel.send(message);

    console.log("✅ Message sent:", message);
    console.log("━━━━━━━━━━━━━━━━━━━━");

    return res.status(200).send("OK");

  } catch (err) {
    console.log("━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ ERROR in /form:");
    console.error(err);
    console.log("━━━━━━━━━━━━━━━━━━━━");

    return res.status(500).send("Error");
  }
});

/* SERVER START */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀 SERVER STARTED");
  console.log("➡️ PORT:", PORT);
  console.log("━━━━━━━━━━━━━━━━━━━━");
});

client.login(process.env.DISCORD_TOKEN);
