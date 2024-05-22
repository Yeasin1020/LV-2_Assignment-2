# LV-2_Assignment-2

1. First we need to clone repository in our computer

- git clone (github repo link)
- cd your-repo-name

2. Then we need to install all the dependencies

- npm install

3. Set up environment variables

- Create a .env file in the root directory of the project
- Add the following variables to the .env file
- Like this (MONGODB_URI, PORT)

4. Then we need to run the server

5. Product

- Create Product
- Endpoint: POST /api/products
- Request Body:
  {
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "variants": [
  { "type": "color", "value": "red" },
  { "type": "size", "value": "M" }
  ],
  "inventory": {
  "quantity": 50,
  "inStock": true
  }
  }

6. Get All Products

- Endpoint: GET /api/products

7. Delete Product

- Endpoint: DELETE /api/products/:productsId

8. Orders

- Create Order
- Endpoint: POST /api/orders
- Request Body:
  {
  "email": "customer@example.com",
  "productId": "60d21b4667d0d8992e610c85",
  "price": 100,
  "quantity": 1
  }

9. Get Orders by Email

- Endpoint: GET /api/orders/:email

10. Error Handling

- Routes not found
- Insufficient inventory quantity
- Invalid product ID
  etc.
