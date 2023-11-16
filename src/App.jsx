import { Routes, Route } from 'react-router-dom';
import { AdminPanel } from './containers/AdminPanel';
import { Timeline } from './containers/Timeline';

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route index element={<Timeline />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
