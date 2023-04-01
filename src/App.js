import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Analytics from "./components/Analytics";
function App() {
  return (
    <div className="app_container">
      <div className="sidebar"></div>
      <Analytics />
      <Routes>
        <Route path="/" element={<Navigate replace to="/analytics" />} />
      </Routes>
    </div>
  );
}

export default App;
