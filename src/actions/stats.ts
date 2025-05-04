'use server';
import { db } from '@/lib/db';
import { currentUser, roleGuard } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { ActionResponse } from '@/types';
import { revalidatePath } from 'next/cache';
import { OnboardingOneSchema, OnboardingThreeSchema, OnboardingTwoSchema, UserSchema } from '@/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById, getUserByNumber } from '@/data/user';
import { capitalizeWords } from '@/lib/utils';

export const getStats = async (): Promise<ActionResponse> => {
  try {
    await roleGuard(UserRole.ADMIN);

    const [users, questions, articles, activities] = await Promise.all([
      db.user.count(),
      db.question.count(),
      db.article.count(),
      db.activity.count(),
    ]);

    const stats = {
      users,
      questions,
      articles,
      activities,
    };

    return { success: 'Statistiques récupérées avec succès', data: stats };
  } catch (error) {
    return { error: 'Erreur lors de la récupération des statistiques' };
  }
};
