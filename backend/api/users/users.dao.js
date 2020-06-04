const mongoose = require('mongoose');
const UserSchema = require('./users.model');

UserSchema.statics = {
    create(data, cb) {
        const user = new this(data);
        user.save(cb);
    },

    getByEmail(query, cb) {
        this.findOne(query, cb);
    },
};

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
