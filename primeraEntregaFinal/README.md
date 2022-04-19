
# Api Carrito y Productos




## API Reference to Products

#### Get all products items

```http
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `admin` | `bool` | **Required**. headers with admin key|

#### Get product

```http
  GET /api/product/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. product id |

#### Create product 

```http
  POST /api/product/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `product`      | `object` | **Required**.  |

#### Update product 

```http
  PUT /api/product/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**.  |
|`product`  | `object`  |**Required**.  |

#### Delete product

```http
  DELETE /api/product/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. product id |




## API Reference to Carts
#### Get all products from cart

```http
  GET /api/carts/cid/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cid` | `number` | **Required**. cart id|

#### Create a new Cart

```http
  POST /api/carts/
```

#### Delete cart

```http
  DELETE /api/carts/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. cart id|

#### Delete product from cart

```http
  DELETE /api/carts/cid/products/pid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cid` | `number` | **Required**. cart id|
| `pid` | `number` | **Required**. product id|

#### Post create new product to cart

```http
  POST /api/carts/cid/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cid` | `number` | **Required**. cart id|