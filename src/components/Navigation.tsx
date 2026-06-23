import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAppSelector } from '../app/hooks';

const Navigation = () => {
  const isRacing = useAppSelector((state) => state.race.isRacing);

  const linkClass = (isActive: boolean): string =>
    `nav__link${isActive ? ' nav__link--active' : ''}${isRacing ? ' nav__link--disabled' : ''}`;

  return (
    <header className="topbar">
      <nav className="nav">
        <NavLink
          to={ROUTES.GARAGE}
          className={({ isActive }) => linkClass(isActive)}
          tabIndex={isRacing ? -1 : undefined}
        >
          Garage
        </NavLink>
        <NavLink
          to={ROUTES.WINNERS}
          className={({ isActive }) => `${linkClass(isActive)} nav__link--pink`}
          tabIndex={isRacing ? -1 : undefined}
        >
          Winners
        </NavLink>
      </nav>
      <h1 className="logo">
        <span className="logo__line">Async</span>
        <span className="logo__line logo__line--pink">Race</span>
      </h1>
      <span className="chevrons" aria-hidden="true">
        &raquo;&raquo;&raquo;&raquo;&raquo;
      </span>
    </header>
  );
};

export default Navigation;
