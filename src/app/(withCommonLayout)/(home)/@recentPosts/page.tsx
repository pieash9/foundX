import { Button } from "@nextui-org/button";
import Link from "next/link";
import { getRecentPosts } from "@/src/services/recentPosts";
import { IPost } from "@/src/types";
import Container from "@/src/components/ui/Container";
import Card from "@/src/components/ui/Card";

const RecentPosts = async () => {
  const { data: posts } = await getRecentPosts();

  return (
    <Container>
      <div className="section-title my-8">
        <h2>Recently Found Items</h2>
        <p className="text-center">
          A list of items that have been recently found and reported.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-44 justify-center lg:grid-cols-3 my-8">
        {posts?.map((post: IPost) => <Card key={post._id} post={post} />)}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href={"/found-items"}>See All</Link>
        </Button>
      </div>
    </Container>
  );
};

export default RecentPosts;
