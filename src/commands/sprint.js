const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const sprintImage =
  "https://media.discordapp.net/attachments/1250957825346244661/1251618964287520879/sprints.png?ex=666f3c7f&is=666deaff&hm=a87bc902cf346f98e6df92aca010e88307e80dcdf2dadfe440b61e007c3d7913&=&format=webp&quality=lossless&width=1199&height=676";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sprint")
    .setDescription("Send a sprint completion message to a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to send the message to")
        .setRequired(true)
    ),
  run: async ({ interaction, client, handler }) => {
    // Get the user mentioned in the command
    const targetUser = interaction.options.getUser("user");

    // Embed message
    const embed = {
      title: "How to Add Yourself to the Sprint",
      image: {
        url: sprintImage, // Make sure you have defined sprintImage somewhere
      },
    };

    // Send the message targeting the mentioned user
    await interaction.reply({
      content: `${targetUser} Congratulations on completing the sprint! Great job! 🎉  Please add yourself to the new sprint channel by following these instructions.`,
      embeds: [embed],
    });
  },
};
