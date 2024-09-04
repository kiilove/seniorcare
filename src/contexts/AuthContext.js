import React, { createContext, useContext, useState, useEffect } from "react";
import useFirebaseAuth from "../hooks/useFireAuth"; // 커스텀 훅에서 currentUser를 가져옴
import { useFirestoreQuery } from "../hooks/useFirestore";
import { where } from "firebase/firestore";

// AuthContext 생성
const AuthContext = createContext();

// AuthContext를 사용하여 현재 로그인된 사용자 정보와 기능 제공
export const useAuth = () => {
  return useContext(AuthContext); // AuthContext를 통해 인증 정보를 가져옴
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const { currentUser, authError, logOut } = useFirebaseAuth(); // 커스텀 훅에서 currentUser, 로그아웃 함수, 오류 상태를 가져옴
  const fetchGroup = useFirestoreQuery();
  const [userGroup, setUserGroup] = useState("");

  const value = {
    currentUser, // 현재 사용자 정보
    authError, // 인증 오류 메시지
    logOut, // 로그아웃 함수
    userGroup, // 사용자 그룹 정보
  };

  useEffect(() => {
    if (currentUser === undefined) {
      return;
    }

    const fetchInfo = async (userID) => {
      if (userID === undefined) return;

      try {
        const condition = [where("userId", "==", userID)];
        await fetchGroup.getDocuments(
          "facilities",
          (data) => {
            if (data?.length > 0) {
              setUserGroup(data[0].group); // 사용자 그룹 정보 설정
            }
          },
          condition
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser !== undefined) {
      fetchInfo(currentUser?.uid);
    }
  }, [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
