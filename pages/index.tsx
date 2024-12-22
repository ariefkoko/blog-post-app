import { useRouter } from "next/router";
import { useEffect } from "react";

// Unused for now, because i choose to show /posts as homepage
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /posts
    router.push("/posts");
  }, [router]);

  return null;
}
