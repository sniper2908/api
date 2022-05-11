'use strict';
const Sequelize = require('sequelize');

module.exports = class ApiTokenModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                  },
                  token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
                  user_id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    references: {
                      model: 'users',
                      key: 'id',
                    },
                    onDelete: 'SET NULL',
                  },
                  
                  is_active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: 0
                  },
                  created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: new Date(),
                  },
                  updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    onUpdate: 'SET DEFAULT',
                    defaultValue: new Date(),
                  },
                  deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                  }
            },
            {
                modelName: 'ApiToken',
                tableName: 'api_tokens',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

}