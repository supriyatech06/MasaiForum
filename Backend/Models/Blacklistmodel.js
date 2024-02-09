const mongoose= require('mongoose');

const blackListSchema = new mongoose.Schema({
    blackList: [String] 
});
  

const BlackListModel = mongoose.model('BlackList', blackListSchema);

module.exports={ BlackListModel }