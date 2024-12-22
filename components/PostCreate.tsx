import { addPost } from "@/lib/api/gorest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PostCreate {
  userId: number;
}

export default function PostCreate({ userId }: PostCreate) {
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const queryClient = useQueryClient();

  const [submittable, setSubmittable] = useState(false);

  const title = form.getFieldValue("title");
  const body = form.getFieldValue("body");

  const mutation = useMutation({
    mutationFn: () => addPost(userId, title, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post added successfully!");
      router.push("/posts");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to add post!");
    },
  });

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [values]);

  // Function to handle submit
  const onSubmitHandler = async () => {
    mutation.mutate();
    setSubmittable(false);
  };

  return (
    <div className="w-full px-6 pt-4 mb-4 rounded-lg shadow-sm border-solid border-2 border-grey-200">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="body" label="Body" rules={[{ required: true }]}>
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            onClick={onSubmitHandler}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
