import { useContext, lazy, Suspense } from 'react';
import { ThemeContext } from './context/theme.context.tsx';
import Navbar from './components/navbar.component.tsx';
import { Routes, Route } from 'react-router-dom';
import CustomLinearProgress from './components/spinner.component.tsx/spinner.component.tsx';

//Lazy loading imports for improved performance.
const Home = lazy(() => import('./pages/home/home.page'));
const Buildings = lazy(() => import('./pages/buildings/buildings.page'));
const AddBuilding = lazy(() => import('./pages/buildings/addBuilding.page'));
const Grades = lazy(() => import('./pages/grades/grades.page'));
const AddGrade = lazy(() => import('./pages/grades/addGrade.page'));
const Students = lazy(() => import('./pages/students/students.page'));
const AddStudent = lazy(() => import('./pages/students/addStudent.page'));
const Classes = lazy(() => import('./pages/classes/classes.page'));
const AddClass = lazy(() => import('./pages/classes/addClass.page'));

const App = () => {
    const { darkMode } = useContext(ThemeContext);

    const appStyles = darkMode ? "app dark" : "app";

    return (
        <div className={appStyles}>
            <Navbar />
            <div className="wrapper">
                <Suspense fallback={<CustomLinearProgress />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/buildings" index element={<Buildings />} />
                        <Route path="/buildings/add" element={<AddBuilding />} />
                        <Route path="/grades" index element={<Grades />} />
                        <Route path="/grades/add" element={<AddGrade />} />
                        <Route path="/students" index element={<Students />} />
                        <Route path="/students/add" element={<AddStudent />} />
                        <Route path="/classes" index element={<Classes />} />
                        <Route path="/classes/add" element={<AddClass />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
};

export default App;