import { getMeals } from "@/lib/meals";
import Image from "next/image";
import Link from "next/link";

async function MealsPage({ params }) {
  const meals = await getMeals();
  console.log(meals);

  return (
    <div className="m-5">
      <h1 className=" text-3xl mb-5 font-bold text-[#1A1A1A] capitalize">
        Delicious meals created for you
      </h1>
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-3 gap-1 sm:gap-8 mt-4">
        {meals.map((el, index) => (
          <div className="shadow-md" key={index}>
            <header>
              <div className=" h-[16rem] relative bg-red-600 rounded-md">
                <img
                  loading="lazing"
                  className="h-full object-cover w-full rounded-md"
                  src={el.image}
                  alt={el.name}
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold text-[#1A1A1A]">
                  {el.title}
                </h2>
                <h3 className=" text-sm text-gray-500">By:{el.creator}</h3>
              </div>
            </header>

            <div className="p-4 relative">
              <p className=" mb-8">{el.summary}</p>
              <Link
                href={`/meals/${el.id}`}
                className=" absolute right-2 bottom-2 rounded-sm bg-[#1A1A1A] text-white px-2 py-1"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MealsPage;
