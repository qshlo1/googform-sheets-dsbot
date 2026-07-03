export async function sendExam(channel, data) {

    const { staticId, rankFromTo, reportLink } = data;

    await channel.send({
        content: "<@&1512785654084534413>",
        embeds: [
            {
                title: "📋 Запрос на повышение",
                color: 0xFFC107,

                fields: [
                    {
                        name: "👤 Имя Фамилия | #StaticID",
                        value: String(staticId || "—"),
                        inline: false
                    },
                    {
                        name: "📈 С какого на какой ранг",
                        value: String(rankFromTo || "—"),
                        inline: false
                    },
                    {
                        name: "📄 Ссылка на отчёт",
                        value: String(reportLink || "—"),
                        inline: false
                    }
                ],

                timestamp: new Date().toISOString()
            }
        ]
    });

}
