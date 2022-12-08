export class LRU {
  max: number;
  cache: Map<string, any>;

  constructor(max = 10) {
      this.max = max;
      this.cache = new Map();
  }

  has(key: string) {
    return this.cache.has(key);
  }

  rentries() {
    return this.cache.entries();
  }

  get(key: string) {
      let item = this.cache.get(key);
      if (item) {
          // refresh key
          this.cache.delete(key);
          this.cache.set(key, item);
      }
      return item;
  }

  set(key: string, val: any) {
      // refresh key
      if (this.cache.has(key)) this.cache.delete(key);
      // evict oldest
      else if (this.cache.size == this.max) this.cache.delete(this.first());
      this.cache.set(key, val);
  }

  first() {
      return this.cache.keys().next().value;
  }
}
