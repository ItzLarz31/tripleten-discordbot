// const timeoutMap = new Map();

// module.exports.checkAndDelete = async (message, client) => {
//   const badWords = ["badword1", "badword2", "badword3"]; // Replace with actual words
//   const staffChannelId = "1251613767632949288"; // Replace with your staff channel ID

//   const containsBadWord = badWords.some((word) =>
//     message.content.toLowerCase().includes(word)
//   );

//   if (containsBadWord) {
//     const now = Date.now();
//     const userId = message.author.id;

//     if (timeoutMap.has(userId)) {
//       const userData = timeoutMap.get(userId);
//       if (now - userData.lastOffense < 60000) {
//         // User has repeated offense within 60 seconds
//         try {
//           // Timeout the user for 60 seconds
//           await message.member.timeout(
//             60000,
//             "Repeated use of inappropriate language"
//           );

//           // Send notification to the staff channel
//           const staffChannel = await client.channels.fetch(staffChannelId);
//           if (staffChannel) {
//             staffChannel.send(
//               `@here User ${
//                 message.author
//               } sent an inappropriate message multiple times in ${
//                 message.channel.name
//               } channel, at ${new Date(
//                 message.createdTimestamp
//               ).toLocaleString()} and has been timed out for 60 seconds.\nMessage content: ${
//                 message.content
//               }`
//             );
//           } else {
//             console.error("Staff channel not found.");
//           }

//           // Delete the message
//           await message.delete();
//         } catch (error) {
//           console.error("Failed to timeout or delete message:", error);
//         }
//       } else {
//         // Reset the offense count
//         timeoutMap.set(userId, { count: 1, lastOffense: now });
//       }
//     } else {
//       // First offense, warn the user and delete the message
//       try {
//         await message.delete();
//         message.channel.send(
//           `${message.author}, please refrain from using inappropriate language.`
//         );
//         timeoutMap.set(userId, { count: 1, lastOffense: now });
//       } catch (error) {
//         console.error("Failed to delete message:", error);
//       }
//     }
//     return true;
//   }
//   return false;
// };
