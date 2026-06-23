import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { startEditing } from './garageSlice';
import { useEngine } from './useEngine';
import CarControls from './CarControls';
import CarTrack from './CarTrack';
import type { Car, CarHandle } from '../../types';

interface CarItemProps {
  car: Car;
  register: (handle: CarHandle) => void;
  unregister: (id: number) => void;
  onRemove: (id: number) => void;
}

const CarItem = ({ car, register, unregister, onRemove }: CarItemProps) => {
  const dispatch = useAppDispatch();
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const { runState, trackRef, carRef, start, stop } = useEngine(car);

  useEffect(() => {
    register({ id: car.id, start, stop });
    return () => unregister(car.id);
  }, [car.id, start, stop, register, unregister]);

  return (
    <div className="car">
      <CarControls
        name={car.name}
        runState={runState}
        isRacing={isRacing}
        onSelect={() => dispatch(startEditing(car))}
        onRemove={() => onRemove(car.id)}
        onStart={() => {
          start().catch(() => {});
        }}
        onStop={() => {
          stop().catch(() => {});
        }}
      />
      <CarTrack name={car.name} color={car.color} trackRef={trackRef} carRef={carRef} />
    </div>
  );
};

export default CarItem;
