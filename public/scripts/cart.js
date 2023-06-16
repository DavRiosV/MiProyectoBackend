const editBtn = document.querySelectorAll(".edit-quantity");
const prices = document.querySelectorAll(".price-tag");
const inputTags = document.querySelectorAll(".input-tag");
const card_tags = document.querySelectorAll(".card-tag");
const delete_buttons = document.querySelectorAll(".delete-product");

editBtn.forEach((button) => {
	button.addEventListener("click", async () => {
		const pid = Number(button.classList[3]);
		const quantity_value = document.querySelector(
			`#edit-cart-quantity-${pid}`
		).value;
		const cart_id = document.querySelector(`#edit-cart-quantity-${pid}`)
			.classList[5];

		const response = await fetch(
			`/api/cart/${cart_id}/product/${pid}/${quantity_value}`,
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
					window.location.reload();
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
});

inputTags.forEach((input) => {
	input.addEventListener("change", () => {
		const pid = input.getAttribute("data-id");
		const price = document.querySelector(`#price-value-${pid}`);
		const price_value = Number(price.classList[2]);
		document.querySelector(`#card-multiplication-${pid}`).innerHTML = `Total: $${
			input.value * price_value
		}`;
	});
});

delete_buttons.forEach((button) => {
	button.addEventListener("click", async () => {
		const pid = Number(button.getAttribute("data-pid"));
		const cart_id = Number(button.getAttribute("data-cid"));
		const quantity = Number(
			document.querySelector(`#edit-cart-quantity-${pid}`).value
		);

		Swal.fire({
			title: "Do you want to save the changes?",
			showCancelButton: true,
			confirmButtonColor: "#c12d2d",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				const response = await fetch(
					`/api/cart/${cart_id}/product/${pid}/${quantity}`,
					{
						method: "DELETE",
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
						timer: 2500,
						timerProgressBar: true,
						willClose: () => {
							window.location.reload();
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
			}
		});
	});
});
