const deleteProduct = async (btn) => {
  const productElement = btn.closest("article");
  const productId = btn.parentNode.querySelector("[name=id]").value;
  const csrfToken = btn.parentNode.querySelector("[name=_csrf]").value;

  const response = await fetch(`/admin/product/${productId}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrfToken,
    },
  });

  try {
    await response.json();
    productElement.parentNode.removeChild(productElement);
  } catch (e) {
    console.log(e);
  }
};
