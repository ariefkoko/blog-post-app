import Layout from "@/components/Layout";
import PostCreate from "@/components/PostCreate";
import {
  deletePost,
  getPostDetail,
  getUserInformation,
} from "@/lib/api/gorest";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { Button, message, Typography } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

const { Text, Title } = Typography;

export default function PostDetailPage() {
  const router = useRouter();
  const postId = router.query.id;

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  const [showCreateForm, setShowCreateForm] = useState(false);

  const queries = useQueries({
    queries: [
      {
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(postId as string),
        refetchOnWindowFocus: false,
        enabled: !!postId,
        retry: false,
      },
      {
        queryKey: ["user", userId],
        queryFn: () => getUserInformation(userId as string),
        refetchOnWindowFocus: false,
        enabled: !!userId,
        retry: false,
      },
    ],
  });

  const [postQuery, userQuery] = queries;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deletePost(postId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post deleted successfully!");
      router.push("/posts");
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "Failed to delete post!");
    },
  });

  // Function to handle delete post
  const deletePostHandler = () => {
    mutation.mutate();
  };

  // Function to handle edit post
  const editPostHandler = () => {
    router.push(`/posts/update?post_id=${postId}`);
  };

  return (
    <Layout>
      <Title level={2}>Post Detail</Title>
      <div className="my-6">
        {userQuery.data ? (
          <>
            <Text>Name : </Text>
            <Text type="secondary">{userQuery.data.name}</Text>
            <br />
            <Text>Email : </Text>
            <Text type="secondary">{userQuery.data.email}</Text>
            <br />
            <Text>Gender : </Text>
            <Text type="secondary">{userQuery.data.gender}</Text>
            <br />
            <Text>Status : </Text>
            <Text type="secondary">{userQuery.data.status}</Text>
          </>
        ) : (
          <Text>User information not found.</Text>
        )}
      </div>

      {postQuery.data ? (
        <>
          <Title level={3}>{postQuery.data.title}</Title>
          <Text type="secondary">{postQuery.data.body}</Text>
        </>
      ) : (
        <Text>Post details not found.</Text>
      )}

      {postQuery.data && (
        <div className="flex flex-col gap-4 my-6">
          {showCreateForm && <PostCreate userId={postQuery.data.user_id} />}
          <Button
            block
            type="primary"
            onClick={() => setShowCreateForm((prev) => !prev)}
          >
            {showCreateForm ? "Cancel" : "Add a New Post for This User"}
          </Button>

          <Button block onClick={editPostHandler}>
            Edit This Post
          </Button>

          <Button block danger onClick={deletePostHandler}>
            Remove This Post
          </Button>
        </div>
      )}
    </Layout>
  );
}
