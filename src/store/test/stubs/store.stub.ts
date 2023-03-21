import { Store } from '../../store.entity'
import {
  FindStoreDto,
  CreateStoreDto,
  UpdateStoreDto
} from '../../dto'
// import { faker } from '@faker-js/faker'

export const getAllStoresStub = (): Partial<Store>[] => {
  return [
    {
      id: '6419d2d6a7fa372d9b99957c',
      name: 'Wuckert - Ferry',
      userId: '64197b42095e5eb087141012'
    },
    {
      id: '6419d2d6a7fa372d9b999584',
      name: 'Gerhold - Gislason',
      userId: '64197b42095e5eb087141014'
    },
    {
      id: '6419d2d6a7fa372d9b99958c',
      name: 'Sipes LLC',
      userId: '64197b42095e5eb087141016'
    },
    {
      id: '6419d2d6a7fa372d9b999595',
      name: 'Bednar, Okuneva and Lebsack',
      userId: '64197b42095e5eb087141018'
    },
    {
      id: '6419d2d6a7fa372d9b999598',
      name: 'Schulist, Daugherty and Kihn',
      userId: '64197b42095e5eb08714101a'
    },
    {
      id: '6419d2d6a7fa372d9b99959e',
      name: 'Gutkowski, Schaden and Schowalter',
      userId: '64197b43095e5eb08714101c'
    },
    {
      id: '6419d2d6a7fa372d9b9995a6',
      name: 'Kautzer, Kuhic and Predovic',
      userId: '64197b43095e5eb08714101e'
    },
    {
      id: '6419d2d6a7fa372d9b9995ac',
      name: 'Cartwright - Mertz',
      userId: '64197b43095e5eb087141020'
    },
    {
      id: '6419d2d6a7fa372d9b9995af',
      name: 'Streich, McKenzie and Lynch',
      userId: '64197b43095e5eb087141022'
    },
    {
      id: '6419d2d6a7fa372d9b9995b5',
      name: 'Becker - Veum',
      userId: '64197b43095e5eb087141024'
    },
    {
      id: '6419d2d6a7fa372d9b9995b9',
      name: 'King - Skiles',
      userId: '64197b43095e5eb087141026'
    },
    {
      id: '6419d2d6a7fa372d9b9995bf',
      name: 'Kihn Inc',
      userId: '64197b43095e5eb087141028'
    },
    {
      id: '6419d2d6a7fa372d9b9995c3',
      name: 'Olson, Stoltenberg and Morissette',
      userId: '64197b43095e5eb08714102a'
    },
    {
      id: '6419d2d6a7fa372d9b9995ca',
      name: 'Howe, Homenick and Schmeler',
      userId: '64197b43095e5eb087141030'
    }
  ]
}

export const createStoreStub = (): CreateStoreDto & {
  userId: string
} => {
  return {
    name: 'Casper LLC',
    userId: '64197b42095e5eb087141012'
  }
}

export const findStoreDtoStub = (): FindStoreDto => {
  return {
    id: '6419d2d6a7fa372d9b99957c'
  }
}

export const updateStoreDtoStub = (): UpdateStoreDto & {
  userId: string
} => {
  return {
    storeId: '6419d2d6a7fa372d9b99957c',
    name: 'Story of My Life',
    userId: '64197b42095e5eb087141012'
  }
}

export const updatedStoreStub = (): Partial<Store> => {
  return {
    id: '6419d2d6a7fa372d9b99957c',
    name: 'Story of My Life',
    userId: '64197b42095e5eb087141012'
  }
}

export const deletedStoreStub = (): Partial<Store> => {
  return {
    id: '6419d2d6a7fa372d9b99957c',
    name: 'Story of My Life',
    userId: '64197b42095e5eb087141012'
  }
}
