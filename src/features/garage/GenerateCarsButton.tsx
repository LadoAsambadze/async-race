import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useCreateCarMutation } from '../../api/garageApi';
import { randomCar } from '../../utils/random';
import { RANDOM_CARS_BATCH } from '../../constants';

const GenerateCarsButton = () => {
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const [createCar] = useCreateCarMutation();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCars = async () => {
    setIsGenerating(true);
    try {
      await Promise.all(
        Array.from({ length: RANDOM_CARS_BATCH }, () => createCar(randomCar()).unwrap()),
      );
    } catch {
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      className="btn btn--generate"
      disabled={isRacing || isGenerating}
      onClick={generateCars}
    >
      {isGenerating ? 'Generating…' : 'Generate cars'}
    </button>
  );
};

export default GenerateCarsButton;
