const User = require("../models/userModel");

module.exports.addTolikedMovies = async (req, res) => {
  
  try {
    const email=req.body;
    const data = req.body;
    if (!email || !data) {
      return res.status(400).json({ msg: "Email and data fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );

        // await User.findByIdAndUpdate(id, {
        //   likedMovies: [...user.likedMovies, data],
        // }, { new: true });
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });

    return res.json({ msg: "Movie successfully added to liked list." });
    
  } catch (error) {
    return res.json({ msg:error.message});
  }
};
