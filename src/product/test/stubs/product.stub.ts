import { Product } from '../../product.entity'
import {
  FindProductDto,
  CreateProductDto,
  UpdateProductDto
} from '../../dto'
// import { faker } from '@faker-js/faker'

export const getAllProductsStub = (): Partial<Product>[] => {
  return [
    {
      id: '6419d2d6a7fa372d9b99957d',
      name: 'Bespoke Bronze Towels',
      price: 626,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=85762',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b99957e',
      name: 'Small Rubber Towels',
      price: 656,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=74668',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b99957f',
      name: 'Licensed Rubber Car',
      price: 141,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=89104',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b999580',
      name: 'Awesome Frozen Computer',
      price: 654,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=24319',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b999581',
      name: 'Small Plastic Bike',
      price: 658,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=49750',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b999582',
      name: 'Tasty Bronze Computer',
      price: 24,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=41895',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b999583',
      name: 'Gorgeous Metal Shirt',
      price: 322,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=8372',
      storeId: '6419d2d6a7fa372d9b99957c'
    },
    {
      id: '6419d2d6a7fa372d9b999585',
      name: 'Handcrafted Soft Towels',
      price: 184,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=24279',
      storeId: '6419d2d6a7fa372d9b999584'
    },
    {
      id: '6419d2d6a7fa372d9b999586',
      name: 'Refined Metal Hat',
      price: 663,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=28290',
      storeId: '6419d2d6a7fa372d9b999584'
    },
    {
      id: '6419d2d6a7fa372d9b999587',
      name: 'Fantastic Plastic Computer',
      price: 597,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=9723',
      storeId: '6419d2d6a7fa372d9b999584'
    },
    {
      id: '6419d2d6a7fa372d9b99958d',
      name: 'Awesome Fresh Tuna',
      price: 431,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=36859',
      storeId: '6419d2d6a7fa372d9b99958c'
    },
    {
      id: '6419d2d6a7fa372d9b99958e',
      name: 'Handmade Metal Fish',
      price: 117,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=60925',
      storeId: '6419d2d6a7fa372d9b99958c'
    },
    {
      id: '6419d2d6a7fa372d9b99958f',
      name: 'Awesome Plastic Bike',
      price: 981,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=68936',
      storeId: '6419d2d6a7fa372d9b99958c'
    },
    {
      id: '6419d2d6a7fa372d9b999596',
      name: 'Oriental Fresh Shirt',
      price: 138,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=53776',
      storeId: '6419d2d6a7fa372d9b999595'
    },
    {
      id: '6419d2d6a7fa372d9b999597',
      name: 'Bespoke Rubber Pizza',
      price: 439,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=27541',
      storeId: '6419d2d6a7fa372d9b999595'
    },
    {
      id: '6419d2d6a7fa372d9b999599',
      name: 'Luxurious Fresh Sausages',
      price: 100,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=1280',
      storeId: '6419d2d6a7fa372d9b999598'
    },
    {
      id: '6419d2d6a7fa372d9b99959a',
      name: 'Refined Bronze Shirt',
      price: 719,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=57807',
      storeId: '6419d2d6a7fa372d9b999598'
    },
    {
      id: '6419d2d6a7fa372d9b99959f',
      name: 'Electronic Wooden Fish',
      price: 577,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=52132',
      storeId: '6419d2d6a7fa372d9b99959e'
    },
    {
      id: '6419d2d6a7fa372d9b9995a0',
      name: 'Gorgeous Wooden Tuna',
      price: 888,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=30288',
      storeId: '6419d2d6a7fa372d9b99959e'
    },
    {
      id: '6419d2d6a7fa372d9b9995a7',
      name: 'Small Concrete Bacon',
      price: 641,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=52095',
      storeId: '6419d2d6a7fa372d9b9995a6'
    },
    {
      id: '6419d2d6a7fa372d9b9995a8',
      name: 'Oriental Granite Fish',
      price: 716,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=16390',
      storeId: '6419d2d6a7fa372d9b9995a6'
    },
    {
      id: '6419d2d6a7fa372d9b9995a9',
      name: 'Luxurious Metal Gloves',
      price: 278,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=43034',
      storeId: '6419d2d6a7fa372d9b9995a6'
    },
    {
      id: '6419d2d6a7fa372d9b9995ad',
      name: 'Oriental Fresh Cheese',
      price: 19,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=5739',
      storeId: '6419d2d6a7fa372d9b9995ac'
    },
    {
      id: '6419d2d6a7fa372d9b9995ae',
      name: 'Intelligent Cotton Cheese',
      price: 347,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=4868',
      storeId: '6419d2d6a7fa372d9b9995ac'
    },
    {
      id: '6419d2d6a7fa372d9b9995b0',
      name: 'Sleek Fresh Keyboard',
      price: 90,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=43129',
      storeId: '6419d2d6a7fa372d9b9995af'
    },
    {
      id: '6419d2d6a7fa372d9b9995b6',
      name: 'Ergonomic Bronze Keyboard',
      price: 273,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=33937',
      storeId: '6419d2d6a7fa372d9b9995b5'
    },
    {
      id: '6419d2d6a7fa372d9b9995ba',
      name: 'Refined Plastic Keyboard',
      price: 958,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=39387',
      storeId: '6419d2d6a7fa372d9b9995b9'
    },
    {
      id: '6419d2d6a7fa372d9b9995c0',
      name: 'Modern Bronze Pants',
      price: 1,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=72589',
      storeId: '6419d2d6a7fa372d9b9995bf'
    },
    {
      id: '6419d2d6a7fa372d9b9995c4',
      name: 'Sleek Plastic Soap',
      price: 718,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=59697',
      storeId: '6419d2d6a7fa372d9b9995c3'
    },
    {
      id: '6419d2d6a7fa372d9b9995cb',
      name: 'Incredible Frozen Keyboard',
      price: 937,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=24576',
      storeId: '6419d2d6a7fa372d9b9995ca'
    },
    {
      id: '6419d2d6a7fa372d9b9995cc',
      name: 'Bespoke Wooden Ball',
      price: 859,
      imageUrl: 'https://loremflickr.com/640/480/business?lock=75527',
      storeId: '6419d2d6a7fa372d9b9995ca'
    }
  ]
}

export const createProductStub = (): CreateProductDto => {
  return {
    name: 'Recycled Plastic Tuna',
    price: 400,
    imageUrl: 'https://loremflickr.com/640/480/animal?lock=85762',
    storeId: '6419d2d6a7fa372d9b99957c'
  }
}

export const findProductDtoStub = (): FindProductDto => {
  return {
    id: '6419d2d6a7fa372d9b99957d'
  }
}

export const updateProductDtoStub = (): UpdateProductDto => {
  return {
    productId: '6419d2d6a7fa372d9b99957d',
    name: 'Effective Spaghetti',
    price: 44,
    storeId: '6419d2d6a7fa372d9b99957c'
  }
}

export const updatedProductStub = (): Partial<Product> => {
  return {
    id: '6419d2d6a7fa372d9b99957c',
    name: 'Story of My Life',
    price: 44,
    storeId: '6419d2d6a7fa372d9b99957c'
  }
}

export const deletedProductStub = (): Partial<Product> => {
  return {
    id: '6419d2d6a7fa372d9b99957c',
    name: 'Story of My Life',
    price: 44,
    storeId: '6419d2d6a7fa372d9b99957c'
  }
}
