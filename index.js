import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import express from "express";

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`Бот запущен: ${client.user.tag}`);
});

app.post("/form", async (req, res) => {
  const data = req.body;

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  const embed = new EmbedBuilder()
    .setTitle("📩 Отчёт на повышение")
    .setColor(0x00ff99)
    .addFields(
      { name: "Имя", value: data.static || "—", inline: true },
      { name: "Возраст", value: data.udo || "—", inline: true },
      { name: "Возраст", value: data.exam || "—", inline: true },
      { name: "Комментарий", value: data.pmp || "—" }
    );

  channel.send({ embeds: [embed] });

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("API сервер запущен");
});

client.login(process.env.DISCORD_TOKEN);
