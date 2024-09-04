// src/contexts/AuthContext.js

import React, { createContext, useContext } from "react";
import useFirebaseAuth from "../hooks/useFireAuth"; // 커스텀 훅에서 currentUser를 가져옴

// AuthContext 생성
const AuthContext = createContext();

// AuthContext를 사용하여 현재 로그인된 사용자 정보와 기능 제공
export const useAuth = () => {
  return useContext(AuthContext); // AuthContext를 통해 인증 정보를 가져옴
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const { currentUser, authError, logOut } = useFirebaseAuth(); // 커스텀 훅에서 currentUser, 로그아웃 함수, 오류 상태를 가져옴

  const value = {
    currentUser, // 현재 사용자 정보
    authError, // 인증 오류 메시지
    logOut, // 로그아웃 함수
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
