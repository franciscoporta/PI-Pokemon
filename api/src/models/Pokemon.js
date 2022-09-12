const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      // type: DataTypes.UUIDV4,
      // allowNull: false,
      // unique: true,
      // primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    img:{
      type:DataTypes.STRING,
    },
    inDB:{
      type:DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {timestamps: false});
};
