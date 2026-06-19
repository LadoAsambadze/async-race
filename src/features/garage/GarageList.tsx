import CarItem from './CarItem';
import type { Car, CarHandle } from '../../types';

interface GarageListProps {
  cars: Car[];
  isLoading: boolean;
  register: (handle: CarHandle) => void;
  unregister: (id: number) => void;
  onRemove: (id: number) => void;
}

const GarageList = ({ cars, isLoading, register, unregister, onRemove }: GarageListProps) => {
  if (isLoading) return <p className="muted">Loading cars…</p>;
  if (cars.length === 0) {
    return <p className="muted">No cars in the garage yet — create one or generate 100! 🚗</p>;
  }

  return (
    <div className="garage-list">
      {cars.map((car) => (
        <CarItem
          key={car.id}
          car={car}
          register={register}
          unregister={unregister}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default GarageList;
