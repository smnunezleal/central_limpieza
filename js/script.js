document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('view-cart');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const products = document.querySelectorAll('.producto');
    const searchInput = document.getElementById('search');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length && typeof cart[0] === 'string') {
        cart = [];
    }

    function updateCartSummary() {
        cartCount.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        if (cartTotal) {
            cartTotal.textContent = total.toLocaleString('es-AR');
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
            return;
        }
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.name} - $${item.price.toLocaleString('es-AR')}`;
            cartItemsContainer.appendChild(div);
        });
    }

    const addButtons = document.querySelectorAll('.add-cart-btn');
    addButtons.forEach(btn => {
        const product = btn.closest('.producto');
        const name = product.querySelector('h3').textContent;
        const priceText = product.querySelector('p').textContent;
        const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
        btn.addEventListener('click', () => {
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartSummary();
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

    const registerForm = document.querySelector('#registrate form');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Gracias por registrarte!');
            registerForm.reset();
        });
    }

    updateCartSummary();
});
