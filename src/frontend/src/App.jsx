import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import SanctionLetterPage from "./Pages/SanctionLetterPage/SanctionLetterPage";
import ProcessNotePage from "./Pages/ProcessNotePage/ProcessNotePage";
import FinancialAnalyzerPage from "./Pages/FinancialAnalyzerPage/FinancialAnalyzerPage";
import Header from "./Widgets/Header/Header";
import AsideMenu from "./Widgets/AsideMenu/AsideMenu";
import CmaData from "./Pages/FinancialAnalyzerPage/CategoryComponents/CmaData/CmaData";
import AnnualReport from "./Pages/FinancialAnalyzerPage/CategoryComponents/AnnualReport/AnnualReport";
import NewsWebsites from "./Pages/FinancialAnalyzerPage/CategoryComponents/NewsWebsites/NewsWebsites";
import ChatBotPage from "./Pages/ChatBotPage/ChatBotPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { useState } from "react";

function App() {
  const [IsLogin, setIsLogin] = useState(0);
  console.log(IsLogin);
  return (
    <main className="flex flex-col w-full  text-white h-dvh overflow-hidden">
      <Header />
      <div className="h-full w-full flex overflow-hidden">
        <div className="w-80 theme-gradient">
          <AsideMenu />
        </div>
        <div className="w-[calc(100%-20rem)] overflow-hidden p-11 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatBotPage />} />
            <Route
              path="/financial-analyzer"
              element={<FinancialAnalyzerPage />}
            >
              <Route path="cma-data" element={<CmaData />} />
              <Route path="annual-report" element={<AnnualReport />} />
              <Route path="news-websites" element={<NewsWebsites />} />
            </Route>
            <Route path="/process-note" element={<ProcessNotePage />} />
            <Route path="/sanction-letter" element={<SanctionLetterPage />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
