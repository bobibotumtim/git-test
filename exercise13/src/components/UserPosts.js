import { useEffect, useState } from "react";

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;

    const fetchPosts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("The post service returned an error.");
        }

        const data = await response.json();
        if (isCurrentRequest) {
          setPosts(data);
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError" && isCurrentRequest) {
          setPosts([]);
          setError("Could not load posts. Please try again.");
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [userId]);

  if (isLoading) {
    return <p className="status-message">Loading posts for user {userId}…</p>;
  }

  if (error) {
    return <p className="status-message status-message--error">{error}</p>;
  }

  return (
    <div className="post-grid" aria-live="polite">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <span>Post {post.id}</span>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

export default UserPosts;
