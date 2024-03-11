import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AvatarBlock = ({ email }) => {
  const link = `http://localhost:3000/api/user/avatar/${email}`;

  return (
    <Avatar>
      <AvatarImage src={link} />
      <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarBlock;
