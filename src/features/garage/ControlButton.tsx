interface ControlButtonProps {
  label: string;
  className: string;
  disabled: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

const ControlButton = ({ label, className, disabled, onClick, ariaLabel }: ControlButtonProps) => (
  <button
    type="button"
    className={className}
    disabled={disabled}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {label}
  </button>
);

export default ControlButton;
