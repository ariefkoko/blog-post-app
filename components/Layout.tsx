import { Button } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  // Function to handle logout
  const logoutHandler = () => {
    Cookies.remove("name");
    Cookies.remove("gorest_token");
    router.push("/login");
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 flex justify-between bg-black py-4 px-6">
        <Link className="text-2xl text-white" href="/">
          <b>Blog</b> Post
        </Link>
        <Button color="default" variant="outlined" onClick={logoutHandler}>
          Logout
        </Button>
      </nav>
      <div className="px-4 pt-20 pb-8 mx-auto w-full max-w-3xl md:px-0">
        {children}
      </div>
    </div>
  );
}
