import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Spin } from "antd";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./components/AdminDashboard";
import RecordList from "./components/RecordList";
import VisitorForm from "./components/VisitorForm";
import Settings from "./components/Settings";
import ActivityLog from "./components/ActivityLog";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // useAuth 및 AuthProvider 가져오기
import "./styles/global.css"; // Tailwind CSS
import "antd/dist/reset.css"; // Ant Design Reset CSS
import SignUpPage from "./pages/SignUpPage";

// 보호된 라우트를 위한 컴포넌트
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // 현재 사용자 정보 확인
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const delay = 2000; // 2초의 딜레이 설정

    const timer = setTimeout(() => {
      setLoading(false); // 2초 후 로딩 중단
    }, delay);

    if (currentUser) {
      setLoading(false); // currentUser가 확정되면 즉시 로딩 중단
      clearTimeout(timer); // 타이머 중단
    }

    console.log(currentUser);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [currentUser]);

  // 로딩 중이면 스핀 표시
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // currentUser가 있으면 자식 컴포넌트를 렌더링하고, 그렇지 않으면 로그인 페이지로 리디렉션
  return currentUser ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* AuthProvider로 전체를 감싸서 currentUser 상태를 공유 */}
      <Router>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          {/* 관리자 대시보드 - 보호된 라우트 */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* 방문 기록 목록 - 보호된 라우트 */}
          <Route
            path="/records"
            element={
              <PrivateRoute>
                <RecordList />
              </PrivateRoute>
            }
          />

          {/* 방문 기록 작성 폼 - 보호된 라우트 */}
          <Route
            path="/add-visitor"
            element={
              <PrivateRoute>
                <VisitorForm />
              </PrivateRoute>
            }
          />

          {/* 관리자 설정 - 보호된 라우트 */}
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* 관리자 활동 로그 - 보호된 라우트 */}
          <Route
            path="/activity-log"
            element={
              <PrivateRoute>
                <ActivityLog />
              </PrivateRoute>
            }
          />

          {/* 기본 경로 리디렉션 */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
