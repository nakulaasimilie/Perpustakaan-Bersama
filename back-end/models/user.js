"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        User.hasOne(models.Profile)
        }
    }
    User.init(
        {
            NIM: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: "NIM",
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "username",
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "email",
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                len: [8],
                },
            },
            code_otp: {
                type: DataTypes.STRING
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
        sequelize,
        modelName: "User",
        }
    );
    return User;
};