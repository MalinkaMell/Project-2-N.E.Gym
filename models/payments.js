module.exports = function(sequelize, DataTypes) {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payerEmail: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Payment.associate = function(models) {
    models.Payment.belongsTo(models.user);
  };
  return Payment;
};
