import { Roles } from ".handlers/config/roles.js";
export async function sendApplicationDS(channel, data) {

  const { staticId, oocAge, knowledge, jobTitle } = data;
  await channel.send({
    content: "<@&15127856540845334413>",
    embeds: [
      {
        title: "Application to Department of Surgery.",
        color: 0xFFC0CB,

        fields: [
          {
            name: "Имя и Фамилия | StaticID",
            value: String(staticId || "–"),
            inline: false
          },
          {
            name: "OOC Возраст",
            value: String(oocAge || "–"),
            inline: false
          },
          {
            name: "Уровень знаний Психологии",
            value: String(knowledge || "–"),
            inline: false
          },
          {
            name: "Скриншот с планшета",
            value: String(jobTitle || "–"),
            inline: false
          }
        ],

        timestamp: new Date().toISOString()
      }
    ]
  })
}
