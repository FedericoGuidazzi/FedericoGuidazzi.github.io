const firebaseConfig = {
    apiKey: "AIzaSyCD2nZNUJod1spnNeGXRS7oujFkGDcu4k8",
    authDomain: "IlTuoAuthDomain",
    databaseURL: "IlTuoDatabaseURL",
    projectId: "listadellaspesa-39a7e",
    storageBucket: "IlTuoStorageBucket",
    messagingSenderId: "IlTuoMessagingSenderId",
    appId: "LaTuaAppId"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Ottieni un riferimento al database
  const database = firebase.database();

document.addEventListener('DOMContentLoaded', function () {
    loadShoppingList();
  });
  
  // Salva dati nel database
function saveData(data) {
    database.ref('nomeDellaTuaTabella').set(data);
  }
  
  // Carica dati dal database
  function loadData(callback) {
    database.ref('nomeDellaTuaTabella').once('value').then(snapshot => {
      const data = snapshot.val();
      callback(data);
    });
  }
  
  function renderShoppingList(shoppingList) {
    const shoppingListDiv = document.getElementById('shoppingListDiv');
    shoppingListDiv.innerHTML = '';
  
    shoppingList.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<span>${item.name} - ${item.quantity}</span> 
                            <button onclick="removeItem('${item.name}')">Elimina</button>`;
      shoppingListDiv.appendChild(listItem);
    });
  }
  
  function addItem() {
    const itemName = document.getElementById('item').value.trim();
    const itemQuantity = parseInt(document.getElementById('quantity').value);
  
    if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
      const shoppingList = getShoppingList();
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
    const shoppingList = getShoppingList();
    const updatedList = shoppingList.filter(item => item.name !== itemName);
    saveShoppingList(updatedList);
    loadShoppingList();
  }
  
  function getShoppingList() {
    const savedData = localStorage.getItem('shoppingList');
    return savedData ? JSON.parse(savedData) : [];
  }
  
  