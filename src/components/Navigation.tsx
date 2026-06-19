import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAppSelector } from '../app/hooks';

// Nav links are disabled mid-race so a race can't be abandoned half-way
// (one of the "handle actions during the race" strategies).
const Navigation = () => {
  const isRacing = useAppSelector((state) => state.race.isRacing);

  const linkClass = (isActive: boolean): string =>
    `nav__link${isActive ? ' nav__link--active' : ''}${isRacing ? ' nav__link--disabled' : ''}`;

  return (
    <nav className="nav">
      <h1 className="nav__brand">🏁 Async Race</h1>
      <div className="nav__links">
        <NavLink
          to={ROUTES.GARAGE}
          className={({ isActive }) => linkClass(isActive)}
          tabIndex={isRacing ? -1 : undefined}
        >
          Garage
        </NavLink>
        <NavLink
          to={ROUTES.WINNERS}
          className={({ isActive }) => linkClass(isActive)}
          tabIndex={isRacing ? -1 : undefined}
        >
          Winners
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
