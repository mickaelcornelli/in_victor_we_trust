import { getPosts } from '../../api/api';

const BlogPage = async () => {
    const posts = await getPosts();

    return (
        <div className="container">
            {posts.map((post, index) => (
                <div key={index}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default BlogPage;
