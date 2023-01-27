# Get authenticated user
GET
/users/me

## Returns

```typescript
{
    id: string,
    createdAt: string,
    updatedAt: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    city: string,
    pointOfIssue: string,
    role: boolean
}
```

# Authorization

POST
/auth/signup

## Body

```typescript
{
    email: string

    password: string

    phoneNumber?: string

    firstName?: string

    lastName?: string

    city?: string

    pointOfIssue?: string
}
```

## Returns 

```typescript
{
    accessToken: string
}
```

POST
/auth/signin

## Body

```typescript
{
    email: string
    password: string
}
```

## Returns 

```typescript
{
    accessToken: string
}
```
POST
/auth/signup-admin

## Body

```typescript
{
    email: string

    password: string

    phoneNumber?: string

    firstName?: string

    lastName?: string

    city?: string

    pointOfIssue?: string
}
```

## Returns 

```typescript
{
    accessToken: string
}
```

# Items
GET
/items?params

params: page, brand, sex

## Returns

```typescript
  Item[]
```

GET
/items/:id

## Returns

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,

    name: string,
    desc: String?,
    inStock: number,

    price: number,
    sale: number?,

    sizes: string[],

    sex: string,
    publicationDate: string,

    img: String,
    brandName: String,

    color: String,
    type: String,
  }
```

POST
/items

## Body

```typescript
  {
    name: string,
    price: number,
    sale?: number,

    
    sizes: string[],

    
    sex: string,

    description?: string,

    color: string,

    brand: string,

    type: string,

    img: string,

    inStock: number,

  }
```

## Returns

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,

    name: string,
    desc: String?,
    inStock: number,

    price: number,
    sale: number?,

    sizes: string[],

    sex: string,
    publicationDate: string,

    img: String,
    brandName: String,

    color: String,
    type: String,
  }
```

PATCH
/items

## Body

```typescript
  {
    name?: string,
    price?: number,
    sale?: number,

    
    sizes?: string[],

    
    sex?: string,

    description?: string,

    color?: string,

    brand?: string,

    type?: string,

    img?: string,

    inStock?: number,

  }
```

## Returns

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,

    name: string,
    desc: String?,
    inStock: number,

    price: number,
    sale: number?,

    sizes: string[],

    sex: string,
    publicationDate: string,

    img: String,
    brandName: String,

    color: String,
    type: String,
  }
```

DELETE
/items/:id

# Favourites
GET
/items/favourites

## Returns 

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    items: Item[]
  }
```

POST
/items/favourites

## Body

```typescript
  {
    id: number // id of an item to add to favourites
  }
```

## Returns 

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number
  }
```

DELETE
/items/favourites/:id

## Returns 

# Basket

GET
/items/basket

## Returns 

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    items: Item[]
  }
```

POST
/items/basket

## Body

```typescript
  {
    id: number // id of an item to add to basket
  }
```

## Returns 

```typescript
  {
    id: number,
    createdAt: string,
    updatedAt: string,
    userId: number
  }
```

DELETE
/items/basket/:id

## Returns 

# Order

GET
/order/cities get cities from cdek
## Returns 

```typescript
  City[]
```

GET
/odrer/all for admin

## Returns 

```typescript
  Order[]
```

GET
/odrer get all orders of user 

## Returns  

```typescript
  Order[]
```

POST
/odrer 

## Body

```typescript
  itemsIds: number[]
```

PATCH
/odrer/:id change order status for admin

## Body

```typescript
  { 
    updatedStatus: string 
  }
```




