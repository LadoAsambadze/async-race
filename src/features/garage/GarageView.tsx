import CreateCarForm from './CreateCarForm';
import EditCarForm from './EditCarForm';
import RaceControls from './RaceControls';
import GarageList from './GarageList';
import Pagination from '../../components/Pagination';
import { useGarage } from './useGarage';
import { useRace } from './useRace';

const GarageView = () => {
  const { cars, totalCount, pageCount, page, isLoading, isRacing, removeCar, goToPage } =
    useGarage();
  const { register, unregister, startRace, resetRace } = useRace();

  return (
    <section className="view">
      <h2 className="view__title">Garage ({totalCount})</h2>

      <div className="panel">
        <CreateCarForm />
        <EditCarForm />
      </div>

      <RaceControls hasCars={cars.length > 0} onStartRace={startRace} onResetRace={resetRace} />

      <GarageList
        cars={cars}
        isLoading={isLoading}
        register={register}
        unregister={unregister}
        onRemove={removeCar}
      />

      <Pagination page={page} pageCount={pageCount} disabled={isRacing} onChange={goToPage} />
    </section>
  );
};

export default GarageView;
