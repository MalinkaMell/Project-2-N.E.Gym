module.exports = function(sequelize, DataTypes) {
  const Amenities = sequelize.define("Amenities", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Amenities;
};
