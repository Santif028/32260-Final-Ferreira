const createNewProduct = async () => {
    const newTitle = document.getElementById("title").value;
    const newDescription = document.getElementById("description").value;
    const newPrice = document.getElementById("price").value;
    const newThumbnail = document.getElementById("thumbnail").value;
    const newCode = document.getElementById("code").value;
    const newStock = document.getElementById("stock").value;
    const newCategory = document.getElementById("category").value;

    const data = {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        thumbnail: newThumbnail,
        code: newCode,
        stock: newStock,
        category: newCategory
    };

    await fetch(`${window.location.protocol}//${window.location.host}/api/products/` , {
        method: "post",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then((res) => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error creating new product:", error);
        })

}

const deleteProductById = async (pid) => {
    await fetch(`${window.location.protocol}//${window.location.host}/api/products/${pid}`, {
        method: "delete",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json())
        .then(() => {
            window.location.reload();
        });
}