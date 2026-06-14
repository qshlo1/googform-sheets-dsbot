import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`Бот запущен: ${client.user.tag}`);

  const channel = await client.channels.fetch(process.env.CHANNEL_ID);

  if (!channel) {
    console.log("Канал не найден");
    return;
  }

  channel.send("✅ Бот успешно запущен и работает 24/7");
});

client.login(process.env.DISCORD_TOKEN);
