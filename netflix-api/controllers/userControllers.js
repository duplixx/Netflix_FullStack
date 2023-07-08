const User = require("../models/userModel");

module.exports.addTolikedMovies = async (req, res) => {
  console.log(req.body);
  try {
    const {email,data}=req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }
    if (!data) {
      return res.status(400).json({ msg: "Data field is required" });
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
module.exports.getLikedMovies = async (req, res) => {
  try{
    const {email}=req.params;
    const user=await User.findOne({email});
    if(user){
      return res.json({msg:"Success",movies:user.likedMovies})
    }else{
      return res.json({msg:"User not found"})
    };
  }
  catch(err){
    return res.json({msg:err.message})
  }
};
module.exports.removeFromLikedMovies = async (req, res) => {
    try{
      const {email,movieId}=req.body;
      const user=await User.findOne({email});
      if(user){
        const {likedMovies}=user;
        const movieIndex=likedMovies.findIndex(({id})=>id===movieId);
        if(!movieIndex){
          return res.json(400,{msg:"Movie not found"})
        }
        
       
        likedMovies.splice(movieIndex,1);
          await User.findByIdAndUpdate(
            user._id,
            {
              likedMovies: [...likedMovies],
            },
            { new: true }
          );
          return res.json({msg:"Success",movies:user.likedMovies});
        
      }
    }
  catch(err){
    return res.json({msg:err.message})
  }

  }


