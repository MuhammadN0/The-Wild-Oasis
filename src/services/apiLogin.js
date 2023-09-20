import supabase, {supabaseUrl} from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data } = await supabase.auth.getUser();

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
//https://khnydtczbayilurcoymz.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: error2 } = await supabase.storage.from('avatars').upload(fileName, avatar);
  if (error2) throw new Error(error2.message);
  const { data: updatedUser, error: finalError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (finalError) throw new Error(finalError.message);

  return updatedUser;
}
// const { data, error } = await supabase.auth.updateUser({
//   email: "new@email.com",
//   password: "new-password",
//   data: { hello: 'world' }
// })
//https://khnydtczbayilurcoymz.supabase.co/storage/v1/object/public/avatars/avatar-b6002177-da45-4b54-944b-aa8bdaab67c5-0.3744260755589104