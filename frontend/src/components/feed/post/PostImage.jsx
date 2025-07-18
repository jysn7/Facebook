const PostImage = ({ image }) => {
  if (!image || image.trim() === '') return null;

  return (
    <div className=" bg-black">
      <img
        src={image}
        alt="Post content"
        className="w-full max-h-[500px] object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default PostImage;
