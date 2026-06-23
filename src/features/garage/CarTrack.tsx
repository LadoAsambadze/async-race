import type { RefObject } from 'react';
import CarIcon from '../../components/CarIcon';

interface CarTrackProps {
  color: string;
  trackRef: RefObject<HTMLDivElement>;
  carRef: RefObject<HTMLDivElement>;
}

const CarTrack = ({ color, trackRef, carRef }: CarTrackProps) => (
  <div className="track" ref={trackRef}>
    <div className="track__car" ref={carRef}>
      <CarIcon color={color} />
    </div>
    <span className="track__flag" aria-hidden="true">
      🏁
    </span>
  </div>
);

export default CarTrack;
