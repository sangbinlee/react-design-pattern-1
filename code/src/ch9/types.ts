import { ReactNode, SyntheticEvent } from 'react';

export type ButtonProps = {
  name?: string;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children?: ReactNode;
};

export interface Toggleable {
  isOpen: boolean;
  toggle: () => void;
}

export type PanelProps = {
  heading: ReactNode;
  content: ReactNode;
} & Partial<Toggleable>;
