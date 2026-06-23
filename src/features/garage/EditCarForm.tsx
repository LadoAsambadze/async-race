import CarForm from './CarForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUpdateCarMutation } from '../../api/garageApi';
import { setEditColor, setEditName, stopEditing } from './garageSlice';

const EditCarForm = () => {
  const dispatch = useAppDispatch();
  const edit = useAppSelector((state) => state.garage.edit);
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const [updateCar, { isLoading }] = useUpdateCarMutation();
  const isEditing = edit.id !== null;

  const handleSubmit = async () => {
    if (edit.id === null) return;
    try {
      await updateCar({ id: edit.id, name: edit.name.trim(), color: edit.color }).unwrap();
      dispatch(stopEditing());
    } catch {}
  };

  return (
    <CarForm
      name={edit.name}
      color={edit.color}
      submitLabel="Update"
      disabled={!isEditing || isRacing || isLoading}
      onNameChange={(value) => dispatch(setEditName(value))}
      onColorChange={(value) => dispatch(setEditColor(value))}
      onSubmit={handleSubmit}
    />
  );
};

export default EditCarForm;
