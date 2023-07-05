import { FC, useEffect, useState } from "react";
import { addPost, fetchPosts} from "./post.service";

export type Post = {
    title: string;
    userId: number;
    body: string;
}

type PostDetail = Post & {
    id: number;
}

export type PostDetails = PostDetail[];

const userId = 1;

const Posts: FC = () => {
    const [newPost, setNewPost] = useState<Post>({
        title: '',
        userId: userId,
        body: ''
    });

    const [posts, setPosts] = useState<PostDetails>([]);

    useEffect(() => {
        const fetchPostsWrapper = async () => {
            const res = await fetchPosts();
            console.log(res.filter((post: any) => post.userId === userId));
            setPosts(res);
        }

        fetchPostsWrapper();
    }, [])

    const handlePostTitleChange = (e: any) => {
        setNewPost((post) => ({ ...post, title: e.target.value.trim() }));
    }

    const handlePostBodyChange = (e: any) => {
        setNewPost((post) => ({ ...post, body: e.target.value.trim() }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(!newPost.title || !newPost.body) return;
        const response = await addPost(newPost);
        if(response.status === 'offline') {
            
        }
    }

    const inputClasses = "px-2 py-1 rounded-sm w-1/3 text-slate-700"

    return (
        <div className="w-full">
            <p className="capitalize text-xl text-slate-100">
                Posts
            </p>

            <div className="flex justify-evenly w-4/5 px-5 mx-auto my-3">
                <input type="text" placeholder="title" className={inputClasses} onChange={handlePostTitleChange} />
                <input type="text" placeholder="body" className={inputClasses} onChange={handlePostBodyChange} />
                <button className="button bg-green-500 rounded-lg px-4 py-1" onClick={handleSubmit} >Add</button>
            </div>

            <div className="container mx-auto">
                {
                    posts.map((post) => {
                        return (
                            <div key={`post-${post.userId}-${post.id}`}>
                                {
                                    post.userId === userId ? (
                                        <div className="text-xs border border-slate-500 my-3 py-2 rounded-sm">
                                            <div className="flex justify-center">
                                                <span>{post.id}</span>
                                                <span className="mx-2">{post.userId}</span>
                                                <p>{post.title}</p>
                                            </div>
                                            <div className="">
                                                <p>{post.body}</p>
                                            </div>
                                        </div>
                                    ) : <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Posts;