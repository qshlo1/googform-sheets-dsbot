import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
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
  try {
    const data = req.body;

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    if (!channel) {
      console.log("Канал не найден");
      return res.sendStatus(500);
    }

    const embed = new EmbedBuilder()
      .setTitle("📩 Отчёт на повышение")
      .setColor(0x00ff99)
      .addFields(
        { name: "Имя", value: data.static || "—", inline: true },
        { name: "Удо", value: data.udo || "—", inline: true },
        { name: "Экзамен", value: data.exam || "—", inline: true },
        { name: "Практика", value: data.pmp || "—" }
      );

    await channel.send({ embeds: [embed] });

    res.sendStatus(200);
  } catch (err) {
    console.error("Ошибка:", err);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("API сервер запущен");
});

client.login(process.env.DISCORD_TOKEN);
