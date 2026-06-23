import CarForm from './CarForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCreateCarMutation } from '../../api/garageApi';
import { resetCreateForm, setCreateColor, setCreateName } from './garageSlice';

const CreateCarForm = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.garage.createName);
  const color = useAppSelector((state) => state.garage.createColor);
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const [createCar, { isLoading }] = useCreateCarMutation();

  const handleSubmit = async () => {
    try {
      await createCar({ name: name.trim(), color }).unwrap();
      dispatch(resetCreateForm());
    } catch {}
  };

  return (
    <CarForm
      name={name}
      color={color}
      submitLabel="Create"
      disabled={isRacing || isLoading}
      onNameChange={(value) => dispatch(setCreateName(value))}
      onColorChange={(value) => dispatch(setCreateColor(value))}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateCarForm;
