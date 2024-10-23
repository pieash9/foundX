import { Button } from "@nextui-org/button";
import Container from "../../ui/Container";
import Link from "next/link";
import { getRecentPosts } from "@/src/services/recentPosts";

const RecentPosts = async () => {
  const { data: posts } = await getRecentPosts();
  console.log(posts);

  return (
    <Container>
      <div className="section-title my-8">
        <h2>Recently Found Items</h2>
        <p className="text-center">
          A list of items that have been recently found and reported.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-44 justify-center lg:grid-cols-3 my-8">
        <div>Recent posts</div>
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
