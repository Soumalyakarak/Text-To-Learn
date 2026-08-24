import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import CourseOverviewPage from "./pages/CourseOverviewPage";
import LessonPage from "./pages/LessonPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PricingPage from "./pages/PricingPage";

export default function App() {
  return (
    <Routes>
      {/* Marketing / landing */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Protected App Routes */}
      <Route element={<Layout />}>
        <Route path="course/:courseId" element={<CourseOverviewPage />} />
        <Route path="course/:courseId/module/:moduleIndex/lesson/:lessonIndex" element={<LessonPage />} />
      </Route>
    </Routes>
  );
}
