import { v2 as cloudinary } from "cloudinary";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealById(id) {
  return db.prepare("SELECT * FROM meals WHERE id = ?").get(id);
}
export function deleteMealById(id) {
  return db.prepare("DELETE FROM meals WHERE id = ?").run(id);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Extract the file extension from the image name
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // Convert the image file to a buffer
  const arrayBuffer = await meal.image.arrayBuffer();
  const bufferedImage = Buffer.from(arrayBuffer);

  // Upload the image to Cloudinary
  const uploadResponse = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: fileName, folder: "meals" },
      (error, result) => {
        if (error) {
          reject(new Error("Image upload failed"));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(bufferedImage);
  });

  // Store the secure URL from Cloudinary in the meal object
  meal.image = uploadResponse.secure_url;

  // Insert the meal into the database
  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
export function deleteMeal(id) {
  db.prepare("DELETE FROM meals WHERE id = ?").run(id);
}
