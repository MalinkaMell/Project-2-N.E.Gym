module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define("Session", {
    date: {
      type: DataTypes.DATE
    }
  });
  Session.associate = function(models) {
    models.Session.belongsTo(models.Class);
    models.Session.belongsTo(models.Instructor);
  };
  return Session;
};
