import { getPosts } from "@/lib/api/gorest";
import { Post } from "@/lib/ts/posts.interfaces";
import { useQuery } from "@tanstack/react-query";
import { List, Pagination } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function PostList() {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts", page, perPage],
    queryFn: () => getPosts(page, perPage),
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Function for change pagination page and perPage
  const paginationHandler = (page: number, pageSize: number) => {
    setPage(page);
    setPerPage(pageSize);
  };

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <List
        dataSource={data}
        loading={isLoading}
        renderItem={(post) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  className="font-semibold text-xl"
                  href={`/posts/${post.id}?user_id=${post.user_id}`}
                >
                  {post.title}
                </Link>
              }
              description={<p className="line-clamp-2">{post.body}</p>}
            />
          </List.Item>
        )}
      />

      {!isLoading && (
        <Pagination
          className="mt-6"
          responsive
          total={200}
          pageSizeOptions={[5, 10, 20, 50]}
          onChange={paginationHandler}
        />
      )}
    </div>
  );
}
