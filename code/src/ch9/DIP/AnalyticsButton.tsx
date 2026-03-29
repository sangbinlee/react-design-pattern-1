import { ReactNode, SyntheticEvent, useCallback, useContext } from 'react';

import InteractionContext, {
  InteractionMeasurement,
} from './InteractionContext';

interface ButtonType {
  name: string;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const Button = ({ name, onClick: providedOnClick, children }: ButtonType) => {
  const interactionContext = useContext<InteractionMeasurement | null>(
    InteractionContext,
  );

  const handleClick = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      interactionContext && interactionContext.measure(name, e.timeStamp);
      providedOnClick(e);
    },
    [providedOnClick, interactionContext, name],
  );

  return <button onClick={handleClick}>{children}</button>;
};

export default Button;
