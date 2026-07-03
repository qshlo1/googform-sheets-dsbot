import { sendExam } from "./handlers/exam.js";
import { sendPromotion } from "./handlers/promotion.js";
import { sendWeeklyReport } from "./handlers/weeklyReport.js";
import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.use(express.json());

/* ===========================
   LOG MIDDLEWARE
=========================== */

app.use((req, res, next) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("📥 NEW REQUEST");
  console.log("➡️ Method:", req.method);
  console.log("➡️ URL:", req.url);
  console.log("➡️ Body:", req.body);
  console.log("➡️ Time:", new Date().toISOString());
  console.log("━━━━━━━━━━━━━━━━━━━━");
  next();
});

/* ===========================
   DISCORD CLIENT
=========================== */

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let botReady = false;

const channels = {};

/* ===========================
   BOT READY
=========================== */

client.once("clientReady", async () => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log(`🤖 BOT READY: ${client.user.tag}`);

  try {

    channels.exam = await client.channels.fetch(process.env.CHANNEL_EXAM);
    channels.promotion = await client.channels.fetch(process.env.CHANNEL_PROMOTION);

    botReady = true;

    console.log(`✅ Exam channel: ${channels.exam.id}`);
    console.log(`✅ Promotion channel: ${channels.promotion.id}`);
    console.log("━━━━━━━━━━━━━━━━━━━━");

  } catch (err) {
    console.error("❌ CHANNEL FETCH ERROR:");
    console.error(err);
  }
});

/* ===========================
   ROUTES
=========================== */

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("Server is alive");
});

app.get("/form", (req, res) => {
  console.log("GET /form");
  res.send("Form endpoint exists");
});

app.post("/form", async (req, res) => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("📨 POST /form");
   
   const type = req.body.type;
   console.log("TYPE:", type);

  if (!botReady) {
    console.log("❌ Bot is not ready");
    return res.status(503).send("Bot not ready");
  }

  //if (!cachedChannel) {
    //console.log("❌ Cached channel missing");
    //return res.status(500).send("Channel missing");
  //}

  try {
     console.log("Sending Discord embed...");

     const type = req.body.type;

     if (type === "exam") {

         await sendExam(channels.exam, req.body);

      }
      else if (type === "promotion") {

          await sendPromotion(channels.promotion, req.body);

      }
      else if (type === "WeeklyReport") {

         await sendWeeklyReport(channels.weeklyReport, req.body);

      }  
      else {

         return res.status(400).send("Unknown form type");

      }

  console.log("✅ Embed sent");
  console.log("━━━━━━━━━━━━━━━━━━━━");

  return res.status(200).send("OK");

} catch (err) {
  console.error("❌ SEND ERROR");
  console.error(err);

  return res.status(500).send("Discord send failed");
}
}); 

/* ===========================
   SERVER START
=========================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀 SERVER STARTED");
  console.log(`PORT: ${PORT}`);
  console.log("━━━━━━━━━━━━━━━━━━━━");
});

/* ===========================
   LOGIN
=========================== */

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error("❌ LOGIN ERROR");
  console.error(err);
});
