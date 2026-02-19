class Product {
    // Private fields for the Product class
    #id;
    #productName;
    #brand;
    #weight;
    #type;

    // Constructor to initialize the Product object
    constructor(id, productName, brand, weight, type) {
        this.#id = id;
        this.#brand = brand;
        this.#productName = productName;
        this.#weight = weight;
        this.#type = type;
    }

    // Getter and Setter for id
    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    // Getter and Setter for productName
    getProductName() {
        return this.#productName;
    }

    setProductName(productName) {
        this.#productName = productName;
    }

    // Getter and Setter for brand
    getBrand() {
        return this.#brand;
    }

    setBrand(brand) {
        this.#brand = brand;
    }

    // Getter and Setter for weight
    getWeight() {
        return this.#weight;
    }

    setWeight(weight) {
        this.#weight = weight;
    }

    // Getter and Setter for type
    getType() {
        return this.#type;
    }

    setType(type) {
        this.#type = type;
    }
}