$(document).ready(function() {
  paypal
    .Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          // eslint-disable-next-line camelcase
          purchase_units: [
            {
              // eslint-disable-next-line camelcase
              reference_id: $(".type").text(),
              amount: {
                value: parseFloat($(".amount").text())
              }
            }
          ]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          $("#payment-body").text(
            "Transaction completed by " + details.payer.name.given_name
          );
          console.log(data);
          console.log(details);
          // Call your server to save the transaction
          $.post({
            url: "/paypal",
            data: {
              orderID: data.orderID,
              payerID: data.payerID,
              payerEmail: details.payer.email_address,
              amount: details.purchase_units[0].amount.value,
              status: details.status,
              referenceId: details.purchase_units[0].reference_id
            }
          }).then(() => {
            if (details.status === "COMPLETED") {
              location.href = "/success";
            } else {
              location.href = "/error";
            }
          });
        });
      },
      onCancel: function (data) {
        // Show a cancel page, or return to cart
      },

      onError: function (err) {
        // Show an error page here, when an error occurs
        if (err) {
          throw err;
        }
      }
    })
    .render("#paypal-button-container");
});
