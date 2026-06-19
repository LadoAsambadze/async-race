import { useAppDispatch, useAppSelector } from '../app/hooks';
import { dismissWinner } from '../features/race/raceSlice';

// Modal banner shown when a race produces a winner.
const WinnerBanner = () => {
  const winner = useAppSelector((state) => state.race.winner);
  const dispatch = useAppDispatch();

  if (!winner) return null;

  return (
    <div className="banner" role="dialog" aria-modal="true">
      <div className="banner__card">
        <h2 className="banner__title">🏆 Winner!</h2>
        <p className="banner__text">
          <strong>{winner.name}</strong> finished first in <strong>{winner.time}s</strong>
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => dispatch(dismissWinner())}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerBanner;
