const pid = Number(
	document.querySelector("#price-value").getAttribute("data-id")
);
document
	.querySelector(`#add-to-cart-${pid}`)
	.addEventListener("click", async () => {
		const quantity_value = document.querySelector(
			`#edit-cart-${pid}`
		).value;

		const cart_id = 1;

		const response = await fetch(
			`/api/carts/${cart_id}/product/${pid}/${quantity_value}`,
			{
				method: "PUT",
			}
		);
		const data = await response.json();

		if (response.ok) {
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Saved!",
				html: `<p>${data.stock}</p>`,
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
				willClose: () => {
					window.location.href = "/products";
				},
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Something went wrong!",
				text: `${data.response}`,
				footer: '<a href="/chat/">Ask for a solution in our chat!</a>',
			});
		}
	});

document
	.querySelector(`#edit-cart-${pid}`)
	.addEventListener("change", () => {
		const price_value = document
			.querySelector(`#price-value`)
			.getAttribute("data-price");
		document.querySelector(`#card-multiplication-${pid}`).innerHTML = `Total: $${
			document.querySelector(`#edit-cart-${pid}`).value * price_value
		}`;
	});
