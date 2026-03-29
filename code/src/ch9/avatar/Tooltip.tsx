import { ReactNode } from 'react';

type TooltipProps = { name: string; role: string; children: ReactNode };

function Tooltip({ name, role, children }: TooltipProps) {
  return (
    <div className="avatar-wrapper">
      <div className="avatar-container">{children}</div>
      <div className="hover-tooltip">
        <span className="name">{name}</span>
        <span className="role">/ {role}</span>
      </div>
    </div>
  );
}

export default Tooltip;
