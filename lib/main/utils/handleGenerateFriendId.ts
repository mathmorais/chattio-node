export const handleGenerateFriendId = () => {
  const chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const charsPerGroup = 4;
  const groupAmount = 4;
  const charsAmount = charsPerGroup * groupAmount;

  let insertedChars = 0;
  let friendId = "";

  for (let i = insertedChars; i < charsAmount; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    const hasChar = Math.floor(Math.random() * 2);

    if (hasChar) {
      friendId += chars[randomNumber];
    } else {
      friendId += String(randomNumber);
    }

    insertedChars += 1;

    if (insertedChars < charsAmount && insertedChars % charsPerGroup === 0)
      friendId += "-";
  }

  return friendId;
};
