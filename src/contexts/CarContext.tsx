import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import carsData from '@/data/cars.json';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  transmission: string;
  kmDriven: number;
  ownership: string;
  location: string;
  engine: string;
  power: string;
  mileage: string;
  color: string;
  features: string[];
  images: string[];
  description: string;
}

interface CarContextType {
  cars: Car[];
  favorites: string[];
  compareList: string[];
  userCars: Car[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  addUserCar: (car: Omit<Car, 'id'>) => void;
  getCarById: (id: string) => Car | undefined;
  getAllCars: () => Car[];
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars] = useState<Car[]>(carsData as Car[]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });
  const [userCars, setUserCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('userCars');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('userCars', JSON.stringify(userCars));
  }, [userCars]);

  const addToFavorites = (id: string) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCompare = (id: string) => {
    if (compareList.length < 3 && !compareList.includes(id)) {
      setCompareList(prev => [...prev, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(c => c !== id));
  };

  const isInCompare = (id: string) => compareList.includes(id);

  const clearCompare = () => setCompareList([]);

  const addUserCar = (car: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...car,
      id: `user-${Date.now()}`,
    };
    setUserCars(prev => [...prev, newCar]);
  };

  const getCarById = (id: string) => {
    return [...cars, ...userCars].find(car => car.id === id);
  };

  const getAllCars = () => [...cars, ...userCars];

  return (
    <CarContext.Provider
      value={{
        cars,
        favorites,
        compareList,
        userCars,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        addUserCar,
        getCarById,
        getAllCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
