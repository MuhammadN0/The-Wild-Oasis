import supabase from "./supabase";

export async function getGuests () {
  let { data, error } = await supabase.from('guests').select('*')
  if(error){
    console.log(error.message)
    throw new Error(error.message)
  }

  return data
}