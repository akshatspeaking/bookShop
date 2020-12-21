let editCategory = document.querySelectorAll(".edit-category");


editCategory.forEach( (btn) => {
  btn.addEventListener("click", async (e) => {
    let input = e.target.parentElement.children[0][0];
    let oldName = input.value;
    let id = btn.getAttribute("data-id");
    let newName = await window.prompt("Edit Category Name", oldName);
    let data = {id: id, name: newName};
    let res = await fetch("/admin/editcategory", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    window.location("/admin");
  })
})

    const drawer = document.querySelector('.book-edit-form');
    const openButton = document.querySelector('.book-edit-btn');
    const closeButton = drawer.querySelector('.book-form-close');
    openButton.addEventListener('click', (e) => {
      document.querySelector(".book.title").value = e.target.
      drawer.show()
    });
    closeButton.addEventListener('click', () => drawer.hide());

