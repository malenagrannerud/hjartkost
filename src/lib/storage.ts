/**
 * Safe localStorage operations with error handling and data validation
 */
import { z } from 'zod';

export class StorageError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Safely get an item from localStorage with JSON parsing
 */
export function getStorageItem<T>(key: string, schema?: z.ZodSchema<T>): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    
    // If schema provided, validate the data
    if (schema) {
      const result = schema.safeParse(parsed);
      if (!result.success) {
        console.error(`Invalid data for key "${key}":`, result.error);
        return null;
      }
      return result.data;
    }
    
    return parsed;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Safely set an item in localStorage with JSON stringification
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    
    // Check if quota exceeded
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Consider clearing old data.');
    }
    
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 */
export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
