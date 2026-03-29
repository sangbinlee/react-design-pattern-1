import './Avatar.style.css';

type AvatarProps = {
  name?: string;
  url: string;
};

const Avatar = ({ name, url }: AvatarProps) => {
  return (
    <div className="rounded">
      <img src={url} alt={`${name}'s profile`} />
    </div>
  );
};

export default Avatar;
