'use strict';
const Sequelize = require('sequelize');

module.exports = class UserModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                onUpdate: 'SET DEFAULT',
                defaultValue: new Date()
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, {
            modelName: 'User',
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        })
    }

    static associate(models) {

        
    }

}