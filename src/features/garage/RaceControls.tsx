import { useAppSelector } from '../../app/hooks';

interface RaceControlsProps {
  hasCars: boolean;
  onStartRace: () => void;
  onResetRace: () => void;
}

const RaceControls = ({ hasCars, onStartRace, onResetRace }: RaceControlsProps) => {
  const isRacing = useAppSelector((state) => state.race.isRacing);

  return (
    <div className="race-controls">
      <button
        type="button"
        className="btn btn--race"
        disabled={isRacing || !hasCars}
        onClick={onStartRace}
      >
        Race ▶
      </button>
      <button type="button" className="btn btn--reset" disabled={!isRacing} onClick={onResetRace}>
        Reset ↻
      </button>
    </div>
  );
};

export default RaceControls;
