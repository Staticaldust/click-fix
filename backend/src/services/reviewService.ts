import * as reviewDAL from "../dal/reviewDAL";
import { updateAverageRatings } from "./employeeService";

export const getAllReviews = async (): Promise<any[]> => {
  return reviewDAL.findAll();
};

export const getReviewById = async (id: number): Promise<any | null> => {
  return reviewDAL.findById(id);
};

export const getReviewsByEmployee = async (employeeId: number): Promise<any[]> => {
  return reviewDAL.findByEmployee(employeeId);
};

export const getReviewsByUser = async (userId: number): Promise<any[]> => {
  return reviewDAL.findByUser(userId);
};

export const getReviewsByRating = async (minRating: number): Promise<any[]> => {
  return reviewDAL.findByMinRating(minRating);
};

export const createReview = async (
  review: any,
  date?: string
): Promise<any | null> => {
  const newReview = await reviewDAL.create(review, date);
  if (newReview) {
    await updateAverageRatings(review.employeeId || review.employee?.id || review.employeeId);
  }
  return newReview;
};

export const updateReview = async (
  id: number,
  updates: Partial<any>
): Promise<any | null> => {
  const review = await reviewDAL.findById(id);
  if (!review) return null;

  const updated = await reviewDAL.update(id, updates);
  if (updated) {
    await updateAverageRatings(review.employeeId || review.employee?.id);
  }
  return updated;
};

export const deleteReview = async (id: number): Promise<boolean> => {
  const review = await reviewDAL.findById(id);
  if (!review) return false;

  const success = await reviewDAL.delete_(id);
  if (success) {
    await updateAverageRatings(review.employeeId || review.employee?.id);
  }
  return success;
};
