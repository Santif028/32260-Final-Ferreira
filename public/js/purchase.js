let stripe;
let elements;
document.addEventListener('DOMContentLoaded', (event) => {
    fetch("/publicKey")
        .then((result) => result.json())
        .then((data) => {
            stripe = Stripe(data.publicKey);
            elements = stripe.elements();
            card = elements.create('card');
            card.mount('#card-element');
        });
});

const purchaseProducts = async (cid) => {
    await fetch(`${window.location.protocol}//${window.location.host}/api/carts/${cid}/purchase`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === "success") {
                stripe.confirmCardPayment(res.payload.client_secret, {
                    payment_method: {
                        card: card,
                    },
                }).then((result) => {
                    if (result.error) {
                        console.log(result.error);
                    } else {
                        if (result.paymentIntent.status === 'succeeded') {
                            confirmPurchase(cartId);
                        }
                    }
                });
            } else {
                console.log(res.payload);
            }
        });


};

const confirmPurchase = (cartId) => {
    fetch(`${window.location.protocol}//${window.location.host}/api/carts/${cartId}/confirmPurchase`, { method: "POST" })
        .then((res) => res.json())
        .then((res) => {
            if (res.status === "success") {
                Swal.fire({
                    html: `<p>${res.user.user}, su compra fue efectuada por el monto de: $${res.payload.ticket.amount}</p> <p>Código de ticket: ${res.payload.ticket.code}</p> `,
                    icon: res.status,
                    showConfirmButton: true,
                    confirmButtonText: "Continuar",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/api/products");
                    }
                });
            } else {
                Swal.fire({
                    html: `<p>${res.payload}</p> `,
                    icon: res.status,
                });
            }
        });
}

const goBackToCart = (cid) => {
    window.location.href = `/api/carts/${cid}`;
}