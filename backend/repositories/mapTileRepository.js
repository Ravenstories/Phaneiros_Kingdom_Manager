import { supabase } from '../supabaseClient.js';
import { sqlHelper } from '../library/sqlHelper.js';

/**
 * Find one tile by its UUID, or return null.
 */
export async function getTileById(id) {
  const { data, error } = await supabase
    .from('territory')
    .select('*')
    .eq('territory_id', id)
    .single();

  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data ?? null;
}

// Get all tiles for a gameId
// This is a SQL function that returns a set of rows.
// It takes a gameId as an argument and returns all tiles for that game.
/*
const sql = sqlHelper('territory/get_all_tiles.sql');
const GET_ALL_TILES = sqlHelper('territory/get_all_tiles.sql');
export async function getAllTiles (gameId) {
  console.log('getAllTiles', gameId);
  const { data, error } = await supabase.rpc('exec_sql', {
    sql_text: GET_ALL_TILES,
    params: { gameid: gameId },
  });
  if (error) {
    console.error('[getAllTiles] ►', error.message, error.details || error.detail);
    throw error;
  }
  return data;          // array of rows
}
*/

export async function getAllTiles(game_id) {
  console.log('getAllTiles', game_id);      // keep this log while testing
  const { data, error } = await supabase.rpc('exec_sql', {
    sql_text: SQL.GET_ALL_TILES,
    params  : { game_id: game_id }          // ← snake case matches :game_id
  });
  if (error) throw error;
  return data;
}