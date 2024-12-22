import { validateToken } from "@/lib/api/gorest";
import { Button, Form, Input, message, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const { Text, Title } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [values]);

  // Function to handle submit
  const loginHandler = async () => {
    try {
      const gorest_token = form.getFieldValue("gorest_token");
      const name = form.getFieldValue("name");
      const isValid = await validateToken(gorest_token);

      if (isValid) {
        message.success("Token is valid! Welcome.");
        Cookies.set("name", name);
        Cookies.set("gorest_token", gorest_token);
        router.push("/");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          "Invalid token. Please check and try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-4 mx-4 my-auto rounded-lg shadow-md sm:w-[640px] sm:m-auto">
        <Title className="text-center">Login</Title>

        <Text>
          Welcome to Blog Post!
          <br />
          To access your account, please enter your name and your GoREST API
          token.
          <br />
          If you dont have a token, visit the Go REST documentation to generate
          one
        </Text>

        <Form
          className="mt-6"
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="gorest_token"
            label="Go Rest Token"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              onClick={loginHandler}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
