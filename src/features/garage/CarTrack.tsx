import type { RefObject } from 'react';
import CarIcon from '../../components/CarIcon';

interface CarTrackProps {
  name: string;
  color: string;
  broken: boolean;
  trackRef: RefObject<HTMLDivElement>;
  carRef: RefObject<HTMLDivElement>;
}

const CarTrack = ({ name, color, broken, trackRef, carRef }: CarTrackProps) => (
  <div className="track" ref={trackRef}>
    <span className="track__edge track__edge--start" aria-hidden="true">
      Start
    </span>
    <span className="track__label" aria-hidden="true">
      {name}
    </span>
    <div className={`track__car${broken ? ' track__car--broken' : ''}`} ref={carRef}>
      <CarIcon color={color} />
      {broken && (
        <span className="track__broken" aria-hidden="true">
          💥
        </span>
      )}
    </div>
    <span className="track__edge track__edge--finish" aria-hidden="true">
      Finish
    </span>
  </div>
);

export default CarTrack;
