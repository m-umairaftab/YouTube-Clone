import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { COMMENTS_API, GOOGLE_API_KEY } from "../utils/constants";

const commentsData = [
  {
    name: "Umair Aftab",
    text: "This video changed my whole perspective. Thanks for sharing!",
    replies: [],
  },
  {
    name: "Ali Khan",
    text: "I didn’t expect that ending 😂",
    replies: [
      {
        name: "Sara Malik",
        text: "Same here! Totally caught me off guard.",
        replies: [],
      },
      {
        name: "Bilal Sheikh",
        text: "It was wild lol. Can’t wait for part 2!",
        replies: [
          {
            name: "Hira Yousuf",
            text: "Fr! Hoping they release it soon.",
            replies: [
              {
                name: "Ahmed Raza",
                text: "They said it’s dropping next month!",
                replies: [
                  {
                    name: "Laiba Qureshi",
                    text: "Omg that’s sooner than I thought!",
                    replies: [
                      {
                        name: "Fahad Ali",
                        text: "Set a reminder already 🔥",
                        replies: [],
                      },
                    ],
                  },
                  {
                    name: "Zoya Mir",
                    text: "Yesss, hyped already!",
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Noor Hassan",
    text: "Can someone explain the part at 3:45?",
    replies: [],
  },
  {
    name: "Mehwish Tariq",
    text: "The editing in this video is so clean 👏",
    replies: [],
  },
  {
    name: "Hamza Javed",
    text: "Subscribed instantly. Keep it up!",
    replies: [],
  },
  {
    name: "Tania Saeed",
    text: "I’ve watched this three times already 😍",
    replies: [],
  },
];

// Comment Component
const Comment = ({ data }) => {
  const { authorProfileImageUrl, authorDisplayName, textOriginal } = data;
  return (
    <div className="flex items-start gap-3 py-3">
      <img
        className="w-10 h-10 rounded-full"
        alt="user"
        src={authorProfileImageUrl}
      />
      <div>
        <p className="font-semibold text-gray-800">{authorDisplayName}</p>
        <p className="text-gray-700">{textOriginal}</p>
      </div>
    </div>
  );
};

// Recursive Comments List Component
const CommentsList = ({ comments }) => {
  return comments?.map((comment, index) => {
    const topLevel = comment?.snippet?.topLevelComment?.snippet;
    if (!topLevel) return null;

    return (
      <div key={index}>
        <Comment data={topLevel} />
        <div className="ml-12">
          {/* Render replies recursively */}
          <CommentsList
            comments={comment.replies ? comment.replies.comments : []}
          />
        </div>
      </div>
    );
  });
};

// Main Comments Container Component
const CommentsContainer = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v"); // Get videoId from URL query
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${COMMENTS_API}${videoId}&key=${GOOGLE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();

        setComments(data.items); // Set the fetched comments
      } catch (err) {
        setError("Failed to load comments.");
        console.error(err);
      } finally {
      }
    };

    if (videoId) {
      fetchComments(); // Fetch comments when videoId changes
    }
  }, [videoId]);

  return (
    <div className="m-5 p-2">
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      {error ? <p>{error}</p> : <CommentsList comments={comments} />}
    </div>
  );
};

export default CommentsContainer;
