const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const accessChat = expressAsyncHandler(async (req, res) => {
    console.log("access chat ");
  const { userId } = req.body;
  if (!userId) {
    console.log("user id not send with request");
    return res.sendStatus(400);
  }
  const sender = await User.findOne({_id:userId});
  console.log(sender);

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
    console.log("ischat",isChat);
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });
  console.log("users chat",isChat);

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: sender.name,
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).
      populate(
        "users",
        "-password"
      );
    } catch (e) {
      console.log(e);
      res.status(400);
      throw new Error(e);
    }
  }
});
const fetchChats = expressAsyncHandler(async (req, res) => {
    console.log("getch chats ",req.user);
  try {
    Chat.find({ users: { $elemMatch:  { $eq: req.user._id }  } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMesssage.sender",
          select: "name email",
        });
        res.status(200).send(result);
      });
  } catch (e) {
    res.status(400);
    throw new Error(e.message);
  }
});
const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "DAta is insufficiant to fetch create" });
  }
  var users = JSON.parse(req.body.users);
  console.log("req crt group", req);
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullgroupchat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullgroupchat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
const fetchGroups = expressAsyncHandler(async (req, res) => {
  try {
    const allGroup = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroup);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const exitGroup = expressAsyncHandler(async (req, res) => {
     const {chatId , userId}= req.body;
     const removed = await Chat.findByIdAndUpdate({chatId,userId})
     .populate("users", "-password")
      .populate("groupAdmin", "-password")
      if(!removed){
        res.status(400).send('no chat to remove');

      }else{
        res.json("removed")
      }
});
const addSelfToGroup = expressAsyncHandler(async (req, res) => {
    const {chatId , userId}= req.body;
    const added = await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId}
    },{
        new:true
    })
    .populate("users", "-password")
     .populate("groupAdmin", "-password")
     if(!added){
       res.status(400).send('no chat to add');

     }else{
       res.json("added to group chat")
     }
});
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  fetchGroups,
  exitGroup,
  addSelfToGroup
};
