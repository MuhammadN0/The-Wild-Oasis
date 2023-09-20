import supabase, { supabaseUrl } from './supabase';




export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) throw new Error('Something went wrong');

  return data;
}
//https://khnydtczbayilurcoymz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg



export async function createCabin(newCabin, id) {

  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imageUrl = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');
  //Create Cabin
  if (!id) query =  query.insert([{ ...newCabin, image: imageUrl }]);
  //Edit Cabin
  if (id) query =  query.update({ ...newCabin, image: imageUrl })
  .eq('id', id)


  const {data , error} = await query.select().single();

  
  if (error) throw new Error("Couldn't create cabin");
  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error("Couldn't upload file and cabin was deleted");
  }

  return data
}






export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) throw new Error("Couldn't delete cabin");
  return null;
}
