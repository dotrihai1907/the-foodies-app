"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function shareMeal(data: FormData) {
  const meal = {
    title: data.get("title") as string,
    summary: data.get("summary") as string,
    instructions: data.get("instructions") as string,
    image: data.get("image") as File,
    creator: data.get("name") as string,
    creator_email: data.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error("Invalid input");
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
