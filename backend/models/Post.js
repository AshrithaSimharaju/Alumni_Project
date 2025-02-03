
// import mongoose from 'mongoose';

// // Define the schema
// const postSchema = new mongoose.Schema(
//   {
//     description: { type: String, required: true, trim: true },
//     fileUrl: { type: String, required: false }, // File URL is optional
//     createdAt: { type: Date, default: Date.now },
//   },
//   { collection: 'posts' } // Explicit collection name
// );

// // Mongoose model
// const Post = mongoose.model('Post', postSchema);

// export default Post;





import mongoose from 'mongoose';

// Define the schema
const postSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: false }, // File URL is optional
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profiles', // Ensure it refers to the 'Profiles' collection
    },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'posts' } // Explicit collection name
);

// Mongoose model
const Post = mongoose.model('Post', postSchema);

export default Post;