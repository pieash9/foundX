import { ReactNode } from "react";

const HomeLayout = ({
  children,
  recentPosts,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) => {
  return (
    <div>
      {children} {recentPosts}
    </div>
  );
};

export default HomeLayout;
