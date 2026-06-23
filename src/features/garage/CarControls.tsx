import ControlButton from './ControlButton';
import type { CarRunState } from '../../types';

interface CarControlsProps {
  name: string;
  runState: CarRunState;
  isRacing: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onStart: () => void;
  onStop: () => void;
}

const CarControls = (props: CarControlsProps) => {
  const { name, runState, isRacing, onSelect, onRemove, onStart, onStop } = props;
  const manageDisabled = isRacing || runState === 'starting' || runState === 'driving';
  const startDisabled = isRacing || runState !== 'idle';
  const stopDisabled = isRacing || runState === 'idle' || runState === 'starting';

  return (
    <div className="car__controls">
      <ControlButton
        label="Select"
        className="btn btn--sm btn--cyan"
        disabled={manageDisabled}
        onClick={onSelect}
      />
      <ControlButton
        label="A"
        className="btn btn--ab btn--start"
        disabled={startDisabled}
        onClick={onStart}
        ariaLabel={`Start engine of ${name}`}
      />
      <ControlButton
        label="Remove"
        className="btn btn--sm btn--pink"
        disabled={manageDisabled}
        onClick={onRemove}
      />
      <ControlButton
        label="B"
        className="btn btn--ab btn--stop"
        disabled={stopDisabled}
        onClick={onStop}
        ariaLabel={`Stop engine of ${name}`}
      />
    </div>
  );
};

export default CarControls;
