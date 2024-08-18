import { deleteMeal, getMealById } from "@/lib/meals";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

async function MealDetails({ params }) {
  const { id } = params;
  const meal = await getMealById(id);
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  // formatting the instructions
  if (!meal) {
    notFound(); // 404
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl text-[#1A1A1A] font-bold sm:text-4xl">
            Explore the world of food and meals with us
          </h2>
          <Link href="/meals/share">
            <button className="mt-4 px-6 py-2  text-white bg-[#1A1A1A]">
              Share Your Favorite Meals
            </button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-60 overflow-hidden sm:h-80 lg:h-full">
            <img
              alt="meal"
              src={meal.image}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-16">
            <article className="space-y-4 text-gray-600">
              <h1 className=" text-xl font-medium text-[#1A1A1A]">
                {meal.title}
              </h1>
              <p>{meal.summary}.</p>

              <p
                dangerouslySetInnerHTML={{
                  __html: meal.instructions,
                }}
              ></p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MealDetails;
