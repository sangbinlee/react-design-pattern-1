import Button from '../button/Button';
import { SyntheticEvent } from 'react';

type FancyButtonProps = {
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
};

const FancyButton = ({
  onClick: originalOnClick,
  ...rest
}: FancyButtonProps) => {
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    //emit an event to the analytic server
    console.log('sending analytics event to a remote server');
    return originalOnClick(e);
  };

  return <Button onClick={onClick} {...rest} />;
};

export default FancyButton;
