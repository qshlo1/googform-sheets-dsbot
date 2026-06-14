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
  console.log("Получен запрос:", req.body);

  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    console.log("Канал найден:", channel?.id);

    await channel.send("Тест");

    console.log("Сообщение отправлено");

    res.status(200).send("OK");
  } catch (err) {
    console.error("Ошибка /form:", err);
    res.status(500).send("Error");
  }
});

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

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("API сервер запущен на порту", PORT);
});

client.login(process.env.DISCORD_TOKEN);
