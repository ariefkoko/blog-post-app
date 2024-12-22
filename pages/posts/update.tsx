import Layout from "@/components/Layout";
import { editPost, getPostDetail } from "@/lib/api/gorest";
import { Post } from "@/lib/ts/posts.interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostEdit() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get("post_id");

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const queryClient = useQueryClient();

  const [submittable, setSubmittable] = useState(false);

  const title = form.getFieldValue("title");
  const body = form.getFieldValue("body");

  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPostDetail(postId as string),
    refetchOnWindowFocus: false,
    enabled: !!postId,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: () => editPost(postId as string, title, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      message.success("Post edited successfully!");
      router.push(`/posts/${postId}`);
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to edit post!");
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        body: data.body,
      });
    }
  }, [data]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <Typography.Title level={2}>Edit Post</Typography.Title>
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
