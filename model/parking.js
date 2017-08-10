
var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');
var Community = require('./community');
var User = require('./user');

var Parking = sequelize.define('parking_info', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},

    //community: {type: Sequelize.INTEGER, references: {model: 'community_info', key: 'id'}},
    community_id: {type: Sequelize.INTEGER, allowNull: false},

    //user: {type: Sequelize.INTEGER, references: {model: 'user', key: 'id'}},
    user_id: {type: Sequelize.INTEGER, allowNull: false},

    parking_time_start: {type: Sequelize.TIME},

    parking_time_end:  {type: Sequelize.TIME},

    info: {type: Sequelize.STRING},

    is_checked: {type: Sequelize.BOOLEAN}

    }, {

    freezeTableName: true

    }
);

Parking.belongsTo(Community, {foreignKey: 'community_id'});
Parking.belongsTo(User, {foreignKey: 'user_id'});

var parking = Parking.sync({force: false});

var addInfo = function(parking) {
    return Parking.create({
        user_id: parking.user_id,
        community_id: parking.community_id,
        parking_time_start: parking.time_start,
        parking_time_end: parking.time_end,
        info: parking.info
    });
};

module.exports = Parking;
module.exports.addInfo = addInfo;
