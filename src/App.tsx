import { Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import WinnerBanner from './components/WinnerBanner';
import GarageView from './features/garage/GarageView';
import WinnersView from './features/winners/WinnersView';
import { ROUTES } from './constants';

const App = () => (
  <>
    <Navigation />
    <main className="container">
      <Routes>
        <Route path={ROUTES.GARAGE} element={<GarageView />} />
        <Route path={ROUTES.WINNERS} element={<WinnersView />} />
        <Route path="*" element={<Navigate to={ROUTES.GARAGE} replace />} />
      </Routes>
    </main>
    <WinnerBanner />
  </>
);

export default App;
