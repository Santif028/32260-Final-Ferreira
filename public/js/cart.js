const addProductToCart = async (cid, pid) => {
  const baseUrl = `${window.location.protocol}//${window.location.host}/api/`;
  const endpoint = `carts/${cid}/product/${pid}`;
  const url = `${baseUrl}${endpoint}`;

  await fetch(url, {
    method: "post",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  await getCart();
};
const deleteProductInCart = async (pid) => {
  await fetch(`${window.location.href}/product/${pid}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then(() => {
      window.location.reload()
    });
  await getCart();
};
const deleteProductsInCart = async () => {
  await fetch(`${window.location.href}`, {
    method: "delete",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
    .then(() => {
      window.location.reload()
    });
  await getCart();
};
const redirectToCheckout = (cid, boolean) => {
  if (boolean === "true") {
    Swal.fire({
      html: `<p>Usted no puede comprar debido a que es admin o el producto lo ha subido usted mismo a la página</p> `,
      icon: 'error',
      showConfirmButton: true,
      confirmButtonText: "Continuar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = "/api/products";
      }
    });
  } else {
    window.location.href = `/api/carts/${cid}/checkout`;
  }
}