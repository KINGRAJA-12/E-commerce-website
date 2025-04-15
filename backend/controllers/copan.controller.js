import Copan from "./../models/copan.model.js"
export const getCopan=async(req,res,next)=>{
    try{
        let userId=req.user?._id;
        let copan=await Copan.findOne({userId:userId,isActive:true});
        console.log("this is from backedn",copan)
        return res.status(200).json({copan});
    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}
export const verifyCopan=async(req,res,next)=>{
    try{
       let userId=req.user?._id;
       let {copan}=req.body;
       console.log(copan)
       if(!copan){
        return res.status(400).json({message:"copan name missing!..please enter valid name"});
       }
       let fetchCopan=await Copan.findOne({copanName:copan,userId:userId,isActive:true});
       console.log(fetchCopan)
       if(!fetchCopan){
        return res.status(400).json({message:"Copan is expired"});
       }
       if(fetchCopan.expiredate<new Date()){
        fetchCopan.isActive=false;
        await fetchCopan.save()
        return res.status(400).json({message:'Your copan get expired'});
       }
       return res.status(200).json({message:"copan is valid",copan:copan})


    }catch(err){
        console.log(err?.message);
        return res.status(500).json({message:err?.message});
    }
}