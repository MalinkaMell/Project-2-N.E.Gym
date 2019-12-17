module.exports = function(sequelize, DataTypes) {
  const Class = sequelize.define("Class", {
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
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 60
    },
    intensity: {
      type: DataTypes.STRING,
      defaultValue: "All levels"
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0
    }
  });
  Class.associate = function(models) {
    models.Class.belongsTo(models.Category);
    models.Class.hasOne(models.Session);
  };
  return Class;
};
