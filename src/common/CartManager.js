class CartManager {
  setCircularConfig(config) {
    localStorage.setItem("circularMapConfig", JSON.stringify(config));
  }
  getCircularConfig() {
    return JSON.parse(localStorage.getItem("circularMapConfig"));
  }
}

const instance = new CartManager();
Object.freeze(CartManager);

export default instance;
