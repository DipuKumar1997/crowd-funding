import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import "./index.css"
function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
}
export default App;