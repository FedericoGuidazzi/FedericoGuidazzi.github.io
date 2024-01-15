import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getDatabase, set, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js';


const firebaseConfig = {
  apiKey: "AIzaSyCD2nZNUJod1spnNeGXRS7oujFkGDcu4k8",
  authDomain: "listadellaspesa-39a7e.firebaseapp.com",
  databaseURL: "https://listadellaspesa-39a7e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "listadellaspesa-39a7e",
  storageBucket: "listadellaspesa-39a7e.appspot.com",
  messagingSenderId: "339295073397",
  appId: "1:339295073397:web:95551c6f994a8bb9d6743c"
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('yourButtonId').addEventListener('click', addItem);
});

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
  loadShoppingList();
});

function saveShoppingList(shoppingList) {
  set(ref(database, 'listaDellaSpesa'), shoppingList);
}

function loadShoppingList() {
  const shoppingListRef = ref(database, 'listaDellaSpesa');

  onValue(shoppingListRef, (snapshot) => {
    const data = snapshot.val();
    renderShoppingList(data || []); // Se non ci sono dati, passa un array vuoto
  });
}

function renderShoppingList(shoppingList) {
  const shoppingListDiv = document.getElementById('shoppingListDiv');
  shoppingListDiv.innerHTML = '';  // Clear existing content

  shoppingList.forEach((item, index) => {
      // Create a div for each item
      const listItem = document.createElement('div');
      listItem.innerHTML = `<span>${item.name} - ${item.quantity}</span>`;
      
      // Create a delete button for each item
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Elimina';
      deleteButton.setAttribute('data-item-name', item.name);
      deleteButton.addEventListener('click', function() {
          removeItem(item.name);
      });

      // Append the delete button to the list item
      listItem.appendChild(deleteButton);

      // Append the list item to the shopping list div
      shoppingListDiv.appendChild(listItem);
  });
}


function addItem() {
  const itemName = document.getElementById('item').value.trim();
  const itemQuantity = parseInt(document.getElementById('quantity').value);

  if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
    const shoppingList = []; // Ottenere la lista direttamente da Firebase
    const existingItemIndex = shoppingList.findIndex(item => item.name === itemName);

    if (existingItemIndex !== -1) {
      shoppingList[existingItemIndex].quantity += itemQuantity;
    } else {
      shoppingList.push({ name: itemName, quantity: itemQuantity });
    }

    saveShoppingList(shoppingList);
    loadShoppingList();
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';
  }
}

function removeItem(itemName) {
  const shoppingList = []; // Ottenere la lista direttamente da Firebase
  const updatedList = shoppingList.filter(item => item.name !== itemName);
  saveShoppingList(updatedList);
  loadShoppingList();
}
