import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookTrip from "./pages/BookTrip";
import MyTrips from "./pages/MyTrips";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/book-a-new-trip" element={<ProtectedRoute><BookTrip /></ProtectedRoute>} />
        <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
