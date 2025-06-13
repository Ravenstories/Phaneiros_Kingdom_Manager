import { supabase } from '../supabaseClient.js';

export async function getUserByEmail(email) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
}

export async function getUserById(id) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createUser(email, password_hash) {
  const { data, error } = await supabase.from('users').insert({ email, password_hash }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser(id, updateData) {
  const { data, error } = await supabase.from('users').update(updateData).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteUser(id) {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) throw new Error(error.message);
} 
