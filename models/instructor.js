module.exports = function(sequelize, DataTypes) {
  const Instructor = sequelize.define("Instructor", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    bio: {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Instructor.associate = function(models) {
    models.Instructor.hasMany(models.user);
    models.Instructor.hasMany(models.Session);
  };
  return Instructor;
};
