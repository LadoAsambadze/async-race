import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useCreateCarMutation } from '../../api/garageApi';
import { randomCar } from '../../utils/random';
import { RANDOM_CARS_BATCH } from '../../constants';

interface RaceControlsProps {
  hasCars: boolean;
  onStartRace: () => void;
  onResetRace: () => void;
}

const RaceControls = ({ hasCars, onStartRace, onResetRace }: RaceControlsProps) => {
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const [createCar] = useCreateCarMutation();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCars = async () => {
    setIsGenerating(true);
    try {
      const batch = Array.from({ length: RANDOM_CARS_BATCH }, () =>
        createCar(randomCar()).unwrap(),
      );
      await Promise.all(batch);
    } catch {
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="race-controls">
      <button
        type="button"
        className="btn btn--primary"
        disabled={isRacing || !hasCars}
        onClick={onStartRace}
      >
        Start race
      </button>
      <button type="button" className="btn" disabled={!isRacing} onClick={onResetRace}>
        Reset race
      </button>
      <button
        type="button"
        className="btn"
        disabled={isRacing || isGenerating}
        onClick={generateCars}
      >
        {isGenerating ? 'Generating…' : 'Generate 100 cars'}
      </button>
    </div>
  );
};

export default RaceControls;
