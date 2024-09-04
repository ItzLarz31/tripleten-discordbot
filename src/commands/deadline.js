const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deadline")
    .setDescription("Send a deadline message to multiple users")
    .addStringOption((option) =>
      option
        .setName("users")
        .setDescription("The users to send the message to (mention them)")
        .setRequired(true)
    ),
  run: async ({ interaction, client, handler }) => {
    // Acknowledge the interaction immediately
    await interaction.deferReply({ ephemeral: true });

    // Check if the user has the required role or is the creator
    const requiredRoleId = "1081512502057259048";
    const creatorId = "142089146930954240";
    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (
      !member.roles.cache.has(requiredRoleId) &&
      interaction.user.id !== creatorId
    ) {
      await interaction.editReply(
        "You do not have permission to use this command."
      );
      return;
    }

    // Get the mentions from the string option
    const usersMentioned = interaction.options.getString("users");
    const userMentions = usersMentioned.match(/<@!?(\d+)>/g);

    if (!userMentions) {
      await interaction.editReply("No valid user mentions found.");
      return;
    }

    let successCount = 0;
    let failureCount = 0;

    for (const mention of userMentions) {
      const userId = mention.replace(/<@!?(\d+)>/, "$1");
      const targetUser = await client.users.fetch(userId).catch(() => null);

      if (targetUser) {
        try {
          await targetUser.send(
            `Hi ${targetUser}! I hope you are doing well. Your deadline is coming up this Wednesday. If you need more time to finish your project, we can definitely arrange an extension for you. You can also add extensions by yourself through the main page on the platform.

Just let your Success Manager ${interaction.user} know what works best for you!
            
**P.S. This is a bot, so if you reply here, the message will not be seen by anyone. Instead, please make sure to reach out to your Success Manager, ${interaction.user} for any questions or requests.**`
          );
          successCount++;
        } catch (error) {
          console.error(`Error sending DM to ${targetUser.username}:`, error);
          failureCount++;
        }
      } else {
        failureCount++;
      }
    }

    await interaction.editReply(
      `I have sent DMs to ${successCount} user(s). Failed to send to ${failureCount} user(s).`
    );
  },
};
