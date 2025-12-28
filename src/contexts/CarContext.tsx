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

export interface ActivityItem {
  carId: string;
  timestamp: string;
}

export interface BuyInterest extends ActivityItem {
  status: 'Interested' | 'Viewed';
}

interface CarContextType {
  cars: Car[];
  favorites: string[];
  compareList: string[];
  userCars: Car[];
  viewHistory: ActivityItem[];
  compareHistory: ActivityItem[];
  buyInterests: BuyInterest[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  addUserCar: (car: Omit<Car, 'id'>) => void;
  updateUserCar: (id: string, car: Partial<Car>) => void;
  removeUserCar: (id: string) => void;
  getCarById: (id: string) => Car | undefined;
  getAllCars: () => Car[];
  addToViewHistory: (carId: string) => void;
  addToCompareHistory: (carId: string) => void;
  addBuyInterest: (carId: string) => void;
  clearViewHistory: () => void;
  clearCompareHistory: () => void;
  clearBuyInterests: () => void;
  isUserCar: (id: string) => boolean;
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
  const [viewHistory, setViewHistory] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('viewHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareHistory, setCompareHistory] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('compareHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [buyInterests, setBuyInterests] = useState<BuyInterest[]>(() => {
    const saved = localStorage.getItem('buyInterests');
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

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory));
  }, [viewHistory]);

  useEffect(() => {
    localStorage.setItem('compareHistory', JSON.stringify(compareHistory));
  }, [compareHistory]);

  useEffect(() => {
    localStorage.setItem('buyInterests', JSON.stringify(buyInterests));
  }, [buyInterests]);

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
      addToCompareHistory(id);
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

  const updateUserCar = (id: string, updates: Partial<Car>) => {
    setUserCars(prev => 
      prev.map(car => car.id === id ? { ...car, ...updates } : car)
    );
  };

  const removeUserCar = (id: string) => {
    setUserCars(prev => prev.filter(car => car.id !== id));
    // Also remove from favorites and compare if present
    setFavorites(prev => prev.filter(fav => fav !== id));
    setCompareList(prev => prev.filter(c => c !== id));
  };

  const getCarById = (id: string) => {
    return [...cars, ...userCars].find(car => car.id === id);
  };

  const getAllCars = () => [...cars, ...userCars];

  const isUserCar = (id: string) => userCars.some(car => car.id === id);

  const addToViewHistory = (carId: string) => {
    const newItem: ActivityItem = {
      carId,
      timestamp: new Date().toISOString(),
    };
    setViewHistory(prev => {
      // Remove duplicate if exists, add to front
      const filtered = prev.filter(item => item.carId !== carId);
      return [newItem, ...filtered].slice(0, 50); // Keep last 50
    });
  };

  const addToCompareHistory = (carId: string) => {
    const newItem: ActivityItem = {
      carId,
      timestamp: new Date().toISOString(),
    };
    setCompareHistory(prev => {
      const filtered = prev.filter(item => item.carId !== carId);
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const addBuyInterest = (carId: string) => {
    const newItem: BuyInterest = {
      carId,
      timestamp: new Date().toISOString(),
      status: 'Interested',
    };
    setBuyInterests(prev => {
      // Check if already interested
      const exists = prev.find(item => item.carId === carId);
      if (exists) return prev;
      return [newItem, ...prev];
    });
  };

  const clearViewHistory = () => setViewHistory([]);
  const clearCompareHistory = () => setCompareHistory([]);
  const clearBuyInterests = () => setBuyInterests([]);

  return (
    <CarContext.Provider
      value={{
        cars,
        favorites,
        compareList,
        userCars,
        viewHistory,
        compareHistory,
        buyInterests,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        addUserCar,
        updateUserCar,
        removeUserCar,
        getCarById,
        getAllCars,
        addToViewHistory,
        addToCompareHistory,
        addBuyInterest,
        clearViewHistory,
        clearCompareHistory,
        clearBuyInterests,
        isUserCar,
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
