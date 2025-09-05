const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.userId; // from isAuth middleware
    const receiverId = req.params.id;  
    const { message } = req.body;  // request body field

    if(!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    // check for existing conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    if(!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        });
    }

    // create new message
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(201).json({ message: "Message sent successfully ✅" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getMessage=async(req,res)=>{
    try{
      const receiverId=req.params.id;
      const senderId = req.user.userId;
      const conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
      }).populate("messages");
      return res.status(200).json(conversation?.messages);
     
    }catch(error){
        console.log(error);
    }
}
module.exports = { sendMessage,getMessage };
