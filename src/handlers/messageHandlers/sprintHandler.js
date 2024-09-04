const sprintImage =
  "https://media.discordapp.net/attachments/1250957825346244661/1251618964287520879/sprints.png?ex=666f3c7f&is=666deaff&hm=a87bc902cf346f98e6df92aca010e88307e80dcdf2dadfe440b61e007c3d7913&=&format=webp&quality=lossless&width=1199&height=676";

module.exports.addToSprint = async (message, client) => {
  const sprintRegex =
    /(?:can|could|please)?\s*(?:you|I)?\s*(?:be\s*added|get\s*added|add\s*me)\s*(?:to|for)?\s*(?:the\s*)?sprint\s*(\d+|final)/i;

  const match = message.content.match(sprintRegex);

  const embed = {
    title: "How to Add Yourself to the Sprint",
    // description:
    //   "Congratulations on completing the sprint! Great job! 🎉  Please add yourself to the new sprint channel by following these instructions.",
    image: {
      url: sprintImage,
    },
  };

  if (match) {
    const sprintNumber = match[1];
    const roleName = `Sprint ${sprintNumber}`;
    const role = message.guild.roles.cache.find((r) => r.name === roleName);
    const userMention = `<@${message.author.id}>`;

    if (role) {
      try {
        // await message.member.roles.add(role);
        // message.channel.send(
        //   `Congrats on your success! You have been added to ${roleName}!`
        // );
        message.channel.send({
          content: `${userMention} Congratulations on completing the sprint! Great job! 🎉  Please add yourself to the new sprint channel by following these instructions.`,
          embeds: [embed],
        });
      } catch (error) {
        console.error(error);
        message.channel.send({
          content: `${userMention} Congratulations on completing the sprint! Great job! 🎉  Please add yourself to the new sprint channel by following these instructions.`,
          embeds: [embed],
        });
      }
    } else {
      message.channel.send({
        content: `${userMention} Congratulations on completing the sprint! Great job! 🎉  Please add yourself to the new sprint channel by following these instructions.`,
        embeds: [embed],
      });
    }
    return true;
  }
  return false;
};
