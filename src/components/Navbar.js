import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { Header } = Layout;

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
      {
        key: "add-visitor-setting",
        label: <Link to="/add-visitor-setting">기록지 설정</Link>,
      },
      { key: "records", label: <Link to="/records">방문 기록</Link> },
      { key: "add-visitor", label: <Link to="/add-visitor">방문자 추가</Link> },
      { key: "settings", label: <Link to="/settings">설정</Link> },
      { key: "file-upload", label: <Link to="/file-upload">파일 업로드</Link> }
    );
  }

  // 시설관리자 메뉴
  if (userGroup === "시설관리자") {
    items.push(
      {
        key: "add-visitor-setting",
        label: <Link to="/add-visitor-setting">기록지 설정</Link>,
      },
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

  return (
    <Header
      className="header"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Menu theme="dark" mode="horizontal" items={items} style={{ flex: 1 }} />
      {currentUser && (
        <Button
          type="primary"
          onClick={logOut}
          style={{
            marginLeft: "auto",
            backgroundColor: "#ff4d4f",
            borderColor: "#ff4d4f",
          }}
        >
          로그아웃
        </Button>
      )}
    </Header>
  );
};

export default Navbar;
