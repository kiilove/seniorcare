import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, userGroup, logOut } = useAuth(); // 사용자 정보와 그룹 정보 가져오기
  const items = [];

  // 공통 메뉴
  items.push({ key: "home", label: <Link to="/">홈</Link> });

  // 최고관리자 메뉴
  if (userGroup === "최고관리자") {
    items.push(
      {
        key: "admin-dashboard",
        label: <Link to="/admin-dashboard">관리자 대시보드</Link>,
      },
      { key: "settings", label: <Link to="/settings">설정</Link> },
      { key: "file-upload", label: <Link to="/file-upload">파일 업로드</Link> }
    );
  }

  // 시설관리자 메뉴
  if (userGroup === "시설관리자") {
    items.push(
      { key: "records", label: <Link to="/records">방문 기록</Link> },
      { key: "add-visitor", label: <Link to="/add-visitor">방문자 추가</Link> }
    );
  }

  // 방문자 메뉴
  if (userGroup === "방문자") {
    items.push({
      key: "visitor-form",
      label: <Link to="/visitor-form">방문자 폼</Link>,
    });
  }

  // 로그아웃 메뉴
  if (currentUser) {
    items.push({
      key: "logout",
      label: <button onClick={() => logOut()}>로그아웃</button>,
    });
  }

  return <Menu theme="dark" mode="horizontal" items={items} />;
};

export default Navbar;
