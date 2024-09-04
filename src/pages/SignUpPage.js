import React, { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import useFirebaseAuth from "../hooks/useFireAuth"; // Firebase Auth 훅
import { useFirestoreAddData } from "../hooks/useFirestore"; // Firestore AddData 훅

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // 로딩 상태
  const { signUpWithEmail, authError } = useFirebaseAuth(); // 회원가입 함수와 오류 상태
  const {
    addData,
    error: firestoreError,
    loading: firestoreLoading,
  } = useFirestoreAddData(); // Firestore 데이터 추가 훅
  const navigate = useNavigate(); // 회원가입 후 대시보드로 리디렉션

  // 회원가입 처리 함수
  const onFinish = async (values) => {
    setLoading(true);
    const { email, password, facilityName } = values;

    try {
      // Firebase Authentication을 사용한 이메일 회원가입 처리
      await signUpWithEmail(email, password, async (userCredential) => {
        const user = userCredential.user;

        // Firestore에 보호시설 정보 저장
        await addData("facilities", {
          userId: user.uid, // 사용자 UID 저장
          facilityName: facilityName, // 보호시설 이름 저장
          email: user.email, // 이메일 저장
          group: "시설관리자",
        });

        // 회원가입 후 대시보드로 리디렉션
        navigate("/admin-dashboard");
      });
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>회원가입</h2>
      {/* 회원가입 오류 메시지 출력 */}
      {authError && <Alert message={authError} type="error" showIcon />}
      {firestoreError && (
        <Alert message={firestoreError} type="error" showIcon />
      )}

      {/* 회원가입 폼 */}
      <Form form={form} name="signup" onFinish={onFinish}>
        {/* 이메일 입력 */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: "이메일을 입력하세요!" }]}
        >
          <Input placeholder="이메일" />
        </Form.Item>

        {/* 비밀번호 입력 */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요!" }]}
          hasFeedback
        >
          <Input.Password placeholder="비밀번호" />
        </Form.Item>

        {/* 비밀번호 확인 입력 */}
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "비밀번호 확인을 입력하세요!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="비밀번호 확인" />
        </Form.Item>

        {/* 보호시설 이름 입력 */}
        <Form.Item
          name="facilityName"
          rules={[{ required: true, message: "보호시설 이름을 입력하세요!" }]}
        >
          <Input placeholder="보호시설 이름" />
        </Form.Item>

        {/* 회원가입 버튼 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading || firestoreLoading}
            block
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;
