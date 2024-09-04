// src/components/Auth.js

import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import useFirebaseAuth from "../hooks/useFireAuth"; // useFirebaseAuth 훅을 가져옵니다.
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Auth = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 로딩 상태
  const { logInWithEmail, authError } = useFirebaseAuth(); // useFirebaseAuth 훅에서 로그인과 오류 상태를 가져옵니다.
  const navigate = useNavigate(); // 로그인 성공 시 대시보드로 리디렉션

  // 폼 제출 시 호출되는 함수
  const onFinish = async (values) => {
    setLoading(true); // 로딩 상태로 변경
    try {
      // 이메일과 비밀번호로 로그인 시도
      await logInWithEmail(values.email, values.password, (userCredential) => {
        // 로그인 성공 후 대시보드로 이동
        navigate("/admin-dashboard");
      });
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>관리자 로그인</h2>
      {/* 로그인 에러 메시지 출력 */}
      {authError && <Alert message={authError} type="error" showIcon />}

      {/* 로그인 폼 */}
      <Form
        form={form}
        name="auth"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        {/* 이메일 입력 필드 */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "이메일을 입력하세요!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="이메일" />
        </Form.Item>

        {/* 비밀번호 입력 필드 */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
        </Form.Item>

        {/* 로그인 버튼 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            로그인
          </Button>
        </Form.Item>
        {/* 로그인 버튼 */}
        <Form.Item>
          <Button
            type="secondary"
            loading={loading}
            block
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
