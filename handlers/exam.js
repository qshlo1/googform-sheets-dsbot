export async function sendExam(channel, data) {

    const { staticId, udo, exam, pmp } = data;

    await channel.send({
        content: "<@&1512785654084534413>",
        embeds: [
            {
                title: "📋 Отчёт на повышение на 2 ранг.",
                color: 0xFFC107,

                fields: [
                    {
                        name: "👤 Имя Фамилия | #StaticID",
                        value: String(staticId || "—"),
                        inline: false
                    },
                    {
                        name: "🪪 Полученное удостоверение.",
                        value: String(udo || "—"),
                        inline: false
                    },
                    {
                        name: "📝 Пройденный экзамен.",
                        value: String(exam || "—"),
                        inline: false
                    },
                    {
                       name: "🕒 Практика по ПМП.",
                       value: String(pmp || "—"),
                       inline: false
                     }
                ],

                timestamp: new Date().toISOString()
            }
        ]
    });
}
