import React from "react";

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

const Comment = ({ data }) => {
  const { name, text } = data;
  return (
    <div className="flex items-start gap-3 py-3">
      <img
        className="w-10 h-10 rounded-full"
        alt="user"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="ml-12">
        {/* recursive call to render replies */}
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-xl font-bold mb-4">Comments</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
