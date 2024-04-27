export class Stack {
  constructor() {
    this.stack = [];
  }

  push(element) {
    this.stack.push(element);
    return this.stack;
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  size() {
    return this.stack.length;
  }

  print() {
    console.log(this.stack);
  }
}

/** Lista Doblemente Enlazada */
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.anterior = null;
    this.siguiente = null;
  }
}

class ListaDoblementeEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
  }

  agregar(valor) {
    const nuevoNodo = new Nodo(valor);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      nuevoNodo.anterior = this.cola;
      this.cola.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }
  }

  deshacer() {
    if (this.cola) {
      const valor = this.cola.valor;
      this.cola = this.cola.anterior;

      if (this.cola) {
        this.cola.siguiente = null;
      } else {
        this.cabeza = null;
      }
      return valor;
    }
    return null;
  }

  rehacer() {
    console.log(this.cola);
    if (this.cola && !this.cola.siguiente) {
      return null; // No hay más acciones para rehacer
    }
    if (this.cola && this.cola) {
      this.cola = this.cola;
      return this.cola.valor;
    }
    return null;
  }

  print() {
    let current = this.cabeza;
    let result = '';
    while (current) {
      result += JSON.stringify(current.valor) + ' <-> '; // Convertir el objeto a cadena JSON
      current = current.siguiente;
    }
    console.log(result.slice(0, -5)); // Eliminar el último '<->' sobrante
  }
}

/** Data History */
export class DataHistory {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  addData(data) {
    // Si hay elementos en el historial después del índice actual,
    // los eliminamos ya que no serán válidos en adelante
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }
    this.history.push(data);
    this.currentIndex++;
  }

  back() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  forward() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  getCurrentData() {
    return this.history[this.currentIndex];
  }

  getHistory() {
    return this.history;
  }
}

// Ejemplo de uso
const dataHistory = new DataHistory();

dataHistory.addData('Datos 1');
dataHistory.addData('Datos 2');
dataHistory.addData('Datos 3');

console.log('getCurrentData:', dataHistory.getCurrentData()); // Datos 3

console.log('back:', dataHistory.back()); // Datos 2
console.log('back:', dataHistory.back()); // Datos 1
console.log('forward:', dataHistory.forward()); // Datos 2
console.log('forward:', dataHistory.forward()); // Datos 3
