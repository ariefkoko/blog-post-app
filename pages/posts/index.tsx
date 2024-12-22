import Layout from "@/components/Layout";
import PostList from "@/components/PostList";
import { Typography } from "antd";

export default function PostListPage() {
  return (
    <Layout>
      <Typography.Title level={2}>Post List</Typography.Title>
      <PostList />
    </Layout>
  );
}
