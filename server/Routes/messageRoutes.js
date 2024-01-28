
const Routes = require('express').Router();
const { AllMessages, sendMessage } = require('../Controllers/messageControllers');
const { protect } = require('../middlerWare/authMiddlerware');


Routes.route('/:chatId').get(protect,AllMessages);
Routes.route('/').post(protect,sendMessage);


module.exports = Routes;
