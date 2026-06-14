import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log(`Бот запущен: ${client.user.tag}`);
});

app.post("/form", async (req, res) => {
  console.log("Получен запрос:", req.body);

  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    console.log("Канал найден:", channel?.id);

    await channel.send("Тест из Google Forms");

    console.log("Сообщение отправлено");

    return res.status(200).send("OK");
  } catch (err) {
    console.error("Ошибка /form:", err);
    return res.status(500).send("Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("API сервер запущен на порту", PORT);
});

client.login(process.env.DISCORD_TOKEN);
