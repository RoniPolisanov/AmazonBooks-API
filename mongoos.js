var mongoose = require('mongoose');
var UserSchema = require('./users.js');


mongoose.connect('mongodb://db_usr:db_pass@ds219100.mlab.com:19100/ronidb_ringapp2018')
    .then(() => {
            var newUser = new UserSchema({
                name: "Nimrod",
                age: 20,
                status: "A",
                group: ["sports", "music"]
            });

            //UserSchema.find({ age: { $gt: 15, $lt: 40 }, status: { $in: ["A", "B"] } },
            newUser.save(
                (err, user) => {
                    if (err) console.log(`query error ${err}`);
                    //console.log(user);
                    mongoose.disconnect();
                });
            console.log(`connected ${newUser}`);
            //mongoose.disconnect();
        },
        err => {
            console.log(`connection error: ${err}`);
        });