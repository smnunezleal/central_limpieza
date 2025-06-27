document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('view-cart');
    const cartCount = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const products = document.querySelectorAll('.producto');
    const searchInput = document.getElementById('search');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
            return;
        }
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            cartItemsContainer.appendChild(div);
        });
    }

    const addButtons = document.querySelectorAll('.add-cart-btn');
    addButtons.forEach(btn => {
        const name = btn.closest('.producto').querySelector('h3').textContent;
        btn.addEventListener('click', () => {
            cart.push(name);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            products.forEach(prod => {
                const name = prod.querySelector('h3').textContent.toLowerCase();
                prod.style.display = name.includes(query) ? '' : 'none';
            });
        });
    }

    cartButton.addEventListener('click', () => {
        cartContainer.classList.toggle('hidden');
        renderCart();
    });

    const contactForm = document.querySelector('#contacto form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Mensaje enviado!');
            contactForm.reset();
        });
    }

    updateCartCount();
});
