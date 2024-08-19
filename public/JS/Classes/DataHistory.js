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

  getCurrentIndex() {
    return this.currentIndex;
  }

  getHistory() {
    return this.history;
  }
}
