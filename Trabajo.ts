// Interfaz Observer
interface Observer {
    // Método que se llama cuando el estado del sujeto cambia
    update(product: Product): void;
  }
  
  // Clase base Producto que actúa como Sujeto
  class Product {
    // Lista de observadores que están suscritos al producto
    protected observers: Observer[] = [];
  
    // Constructor de la clase Product
    constructor(public productName: string, private price: number) {}
  
    // Método para obtener el precio del producto
    getPrice(): number {
      return this.price;
    }
  
    // Método para establecer el nuevo precio del producto
    setPrice(newPrice: number): void {
      // Verificar si el nuevo precio es menor que el precio actual
      if (newPrice < this.price) {
        // Actualizar el precio y notificar a los observadores
        this.price = newPrice;
        this.notifyObservers();
      }
    }
  
    // Método para agregar un observador a la lista
    addObserver(observer: Observer): void {
      this.observers.push(observer);
    }
  
    // Método para quitar un observador de la lista
    removeObserver(observer: Observer): void {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  
    // Método para notificar a todos los observadores cuando hay un cambio
    notifyObservers(): void {
      this.observers.forEach((observer) => observer.update(this));
    }
  }
  
  // Clase concreta que implementa Observer: Cliente
  class Customer implements Observer {
    // Constructor de la clase Customer
    constructor(private customerName: string) {}
  
    // Método que se llama cuando el estado del producto cambia
    update(product: Product): void {
      console.log(
        `Notificación: El precio del producto ${product.productName} ha bajado a ${product.getPrice()} para el cliente ${this.customerName}`
      );
      // Implementar código para enviar notificaciones al cliente.
    }
  }
  
  // Clase concreta que extiende de Product: ElectronicProduct
  class ElectronicProduct extends Product {
    // Propiedad adicional específica para productos electrónicos
    private discount: number;
  
    // Constructor de la clase ElectronicProduct
    constructor(productName: string, initialPrice: number, discount: number) {
      // Llamar al constructor de la clase base
      super(productName, initialPrice);
      // Inicializar la propiedad discount
      this.discount = discount;
    }
  
    // Método para establecer el nuevo precio del producto con descuento
    setPrice(newPrice: number): void {
      // Aplicar descuento específico para productos electrónicos
      super.setPrice(newPrice - this.discount);
    }
  }
  
  // Clase concreta que extiende de Product: ClothingProduct
  class ClothingProduct extends Product {
    // Propiedad adicional específica para productos de ropa
    private size: string;
  
    // Constructor de la clase ClothingProduct
    constructor(productName: string, initialPrice: number, size: string) {
      // Llamar al constructor de la clase base
      super(productName, initialPrice);
      // Inicializar la propiedad size
      this.size = size;
    }
  }
  
  // Cliente: ECommerceSystem
  class ECommerceSystem {
    // Lista de productos en el sistema de comercio electrónico
    private products: Product[] = [];
  
    // Método para agregar un producto al sistema
    addProduct(product: Product): void {
      this.products.push(product);
    }
  
    // Método para suscribir a un cliente a un producto
    subscribeCustomerToProduct(customer: Customer, product: Product): void {
      product.addObserver(customer);
    }
  
    // Método para simular una reducción de precio en un producto
    simulatePriceReduction(product: Product, newPrice: number): void {
      product.setPrice(newPrice);
    }
  }
  
  // Función principal
  function main() {
    // Instanciar el sistema de comercio electrónico
    const ecommerceSystem = new ECommerceSystem();
  
    // Crear productos
    const electronicProduct = new ElectronicProduct('Smartphone', 800, 50);
    const clothingProduct = new ClothingProduct('T-Shirt', 20, 'M');
  
    // Crear cliente
    const customer = new Customer('Cliente1');
  
    // Agregar productos al sistema de comercio electrónico
    ecommerceSystem.addProduct(electronicProduct);
    ecommerceSystem.addProduct(clothingProduct);
  
    // Suscribir cliente a productos
    ecommerceSystem.subscribeCustomerToProduct(customer, electronicProduct);
    ecommerceSystem.subscribeCustomerToProduct(customer, clothingProduct);
  
    // Simular reducción de precios
    ecommerceSystem.simulatePriceReduction(electronicProduct, 750);
    ecommerceSystem.simulatePriceReduction(clothingProduct, 15);
  }
  
  // Ejecutar la aplicación
  main();
  