import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

<Router>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Router>