import { useContext, lazy, Suspense } from 'react';
import { ThemeContext } from './context/theme.context.tsx';
import Navbar from './components/navbar.component.tsx';
import { Routes, Route } from 'react-router-dom';
import CustomLinearProgress from './components/spinner.component.tsx/spinner.component.tsx';

//Lazy loading to improve performance.
const Home = lazy(() => import('./pages/home/home.page'));
const Buildings = lazy(() => import('./pages/buildings/buildings.page'));

const App = () => {
    const { darkMode } = useContext(ThemeContext);

    const appStyles = darkMode ? "app dark" : "app"

    return (
        <div className={appStyles}>
            <Navbar />
            <div className="wrapper">
                <Suspense fallback={<CustomLinearProgress />}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/buildings">
                            <Route index element={<Buildings />} />
                        </Route>
                </Routes>
                </Suspense>
            </div>
        </div>
    )
}

export default App;