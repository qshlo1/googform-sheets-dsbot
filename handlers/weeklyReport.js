export async function sendWeeklyReport(channel, data) {
  
  const { staticId, govWave, inviteds, promotionReport, exam, balls } = data;

    await channel.send({
      content: '<@&1512774578768973824>',
      embeds: [
        {
          title: "Еженедельный отчёт.",
          color: 0xFFC107,

          fields: [
            {
              name: "Имя и фамилия | StaticID",
              value: String(staticId || "—"),
              inline: false
            },
            {
              name: "Гос. волны.",
              value: String(govWave || "—"),
              inline: false
            },
            {
              name: "Собеседования.",
              value: String(inviteds || "—"),
              inline: false
            },
            {
              name: "Проверенный отчёты на повышение.",
              value: String(promotionReport || "—"),
              inline: false
            },
            {
              name: "Проведенные экзамены.",
              value: String(exam || "—"),
              inline: false
            },
            {
              name: "Сколько баллов.",
              value: String(balls || "—"),
              inline: false
            }
        ],


        timestamp: new Date().toISOString()
      }
    ]
  });
}
