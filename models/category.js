module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
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
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Category.associate = function(models) {
    models.Category.hasMany(models.Class);
  };
  return Category;
};
