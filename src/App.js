import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      {/*<Header />*/}
        <AppRoutes />  {/* 라우트 설정을 따로 가져옴 */}
      {/*<Footer />*/}
    </BrowserRouter>
  );
}

export default App;
