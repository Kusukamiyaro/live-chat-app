const { getRounds } = require('bcryptjs');
const { accessChat, fetchChats, createGroupChat, addSelfToGroup, fetchGroups, exitGroup } = require('../Controllers/chatControllers');
const { protect } = require('../middlerWare/authMiddlerware');

const Routes = require('express').Router();

Routes.route('/').post(protect,accessChat);
Routes.route('/').get(protect,fetchChats);
Routes.route('/createGroup').post(protect,createGroupChat);
Routes.route('/fetchGroups').get(protect,fetchGroups);
Routes.route('/groupExit').put(protect,exitGroup);
Routes.route('/addSelfToGroup').put(protect,addSelfToGroup);


module.exports = Routes;
