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
  const inMotion = runState === 'starting' || runState === 'driving';
  const manageDisabled = isRacing || inMotion;
  const startDisabled = isRacing || runState !== 'idle';
  // The car is still at its initial place while 'starting', so stop stays
  // disabled until it is actually moving (also prevents cancelling mid-request).
  const stopDisabled = isRacing || runState === 'idle' || runState === 'starting';

  return (
    <div className="car__controls">
      <button type="button" className="btn btn--sm" disabled={manageDisabled} onClick={onSelect}>
        Select
      </button>
      <button type="button" className="btn btn--sm" disabled={manageDisabled} onClick={onRemove}>
        Remove
      </button>
      <button
        type="button"
        className="btn btn--sm btn--start"
        disabled={startDisabled}
        onClick={onStart}
        aria-label={`Start engine of ${name}`}
      >
        A
      </button>
      <button
        type="button"
        className="btn btn--sm btn--stop"
        disabled={stopDisabled}
        onClick={onStop}
        aria-label={`Stop engine of ${name}`}
      >
        B
      </button>
    </div>
  );
};

export default CarControls;
