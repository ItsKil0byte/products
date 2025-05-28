document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const productForm = document.getElementById("product-form");
    const productInput = document.getElementById("product-input");

    function fetchProducts() {
        fetch("/api/get")
            .then(res => res.json())
            .then(items => {
                productList.innerHTML = "";
                items.forEach(item => {
                    const col = document.createElement("div");
                    col.className = "col-md-12";

                    const card = document.createElement("div");
                    card.className = "card p-3 d-flex flex-row justify-content-between align-items-center";

                    const left = document.createElement("div");
                    left.className = "form-check";
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.className = "form-check-input";
                    checkbox.checked = item.purchased;

                    const label = document.createElement("label");
                    label.className = "form-check-label";
                    label.textContent = item.name;
                    if (item.purchased) label.style.textDecoration = "line-through";

                    checkbox.addEventListener("change", () => {
                        fetch(`/api/buy?id=${item.id}`, { method: "PATCH" })
                            .then(() => fetchProducts());
                    });

                    left.appendChild(checkbox);
                    left.appendChild(label);

                    const right = document.createElement("button");
                    right.className = "btn btn-danger btn-sm";
                    right.textContent = "Удалить";
                    right.addEventListener("click", () => {
                        fetch(`/api/delete?id=${item.id}`, { method: "DELETE" })
                            .then(() => fetchProducts());
                    });

                    card.appendChild(left);
                    card.appendChild(right);
                    col.appendChild(card);
                    productList.appendChild(col);
                });
            });
    }

    productForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = productInput.value.trim();
        if (!name) return;

        fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        }).then(() => {
            productInput.value = "";
            fetchProducts();
        });
    });

    fetchProducts();
});
