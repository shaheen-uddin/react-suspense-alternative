import { useState } from "react";
import Comments from "./components/Comments";
import PostSelector from "./components/PostSelector";

function App() {
  const [selectedPost, setSelectedPost] = useState("");

  const handleSelectedPost = (e) => {
    setSelectedPost(e.target.value);
  };
  return (
    <div className="max-w-3xl flex flex-col justify-center mx-auto space-y-3 py-4">
      <h1 className="text-4xl font-semibold font-mono">
        React suspense and Error Boundaries
      </h1>
      <div className="space-y-4">
        <PostSelector onSelectPost={handleSelectedPost} />
        {selectedPost && <Comments postId={selectedPost} />}
      </div>
    </div>
  );
}

export default App;
