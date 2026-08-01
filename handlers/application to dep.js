import { Roles } from ".handlers/config/roles.js";
export async function sendApplicationtoDI(channel, data) {

const { staticId, oocAge, knowledge, jobTitle } = data;

await channel.send({
  content: "<@&15127856540845334413>",
  embeds: [
    {
      title: "Apllication to Department.",
      color: 0x1E90FF,

      fileds: [
        {
          name: "Имя и фамилия | StaticID",
          value: String(staticId || "–"),
          inline: false
        },
        {
          name: "OOC Возраст",
          value: String(oocAge || "–"),
          inline: false
        },
        {
          name: "Уровень знания УК",
          value: String(knowledge || "–"),
          inline: false
        },
        {
          name: "Текущий ранг",
          value: String(jobTitle || "–"),
          inline: false
        }
      ],

      timestamp: new Date().toISOString()
    }
  ]
  
})
}
