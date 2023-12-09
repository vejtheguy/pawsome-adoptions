interface PostsPerPageProps {
  postsPerPage: number;
  handlePostsPerPage: (value: number) => void;
}

const PostsPerPage: React.FC<PostsPerPageProps> = ({
  postsPerPage,
  handlePostsPerPage,
}) => {
  return (
    <div className="flex justify-start gap-3">
      <div>
        <input
          type="radio"
          id="25_items"
          name="postsPerPage"
          value="25"
          checked={postsPerPage === 25}
          className="hidden peer"
          onChange={() => handlePostsPerPage(25)}
        />
        <label
          htmlFor="25_items"
          className="rounded-md cursor-pointer drop-shadow-md p-3 bg-white text-sm font-semibold text-psMediumGray hover:bg-psMediumGray hover:text-psWhite transition duration-200 peer-checked:border-psWhite peer-checked:text-psWhite peer-checked:bg-psCoral peer-checked:hover:bg-psMediumGray"
        >
          25
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="50_items"
          name="postsPerPage"
          value="50"
          checked={postsPerPage === 50}
          className="hidden peer"
          onChange={() => handlePostsPerPage(50)}
        />
        <label
          htmlFor="50_items"
          className="rounded-md cursor-pointer drop-shadow-md p-3 bg-white text-sm font-semibold text-psMediumGray hover:bg-psMediumGray hover:text-psWhite transition duration-200 peer-checked:border-psWhite peer-checked:text-psWhite peer-checked:bg-psCoral peer-checked:hover:bg-psMediumGray"
        >
          50
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="75_items"
          name="postsPerPage"
          value="75"
          checked={postsPerPage === 75}
          className="hidden peer"
          onChange={() => handlePostsPerPage(75)}
        />
        <label
          htmlFor="75_items"
          className="rounded-md cursor-pointer drop-shadow-md p-3 bg-white text-sm font-semibold text-psMediumGray hover:bg-psMediumGray hover:text-psWhite transition duration-200 peer-checked:border-psWhite peer-checked:text-psWhite peer-checked:bg-psCoral peer-checked:hover:bg-psMediumGray"
        >
          75
        </label>
      </div>
    </div>
  );
};

export default PostsPerPage;
