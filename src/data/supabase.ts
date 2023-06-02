import { createClient } from '@supabase/supabase-js';

/**
 * @returns A supabase client connected to the database
 */
export function connectSupaBase() {
	const supabaseUrl = 'https://urhlfvmxrgmupsrkfkhk.supabase.co';
	const supabaseKey = process.env.REACT_APP_KEY ?? "";
	return createClient(supabaseUrl, supabaseKey);
}

/**
 * @param supabase A Supabase client
 * @returns Return all data from the database as a array of object or return false if the operation fails.
 */
export async function readScore(supabase: any) {
	const response = await supabase.from('boule_infernal').select('*');
	const responseData = response.data ?? false;
	if (responseData && response.status === 200) { return responseData; };
	return false;
}

/**
 * Insert a row into the table "boule_infernal" with Supabase
 * @param supabase A Supabase client
 * @param name Name of the user 
 * @param score The total score of the user
 * @returns True if the values were inserted successfully, false if an error occurred.
 */
export async function insertScore(supabase: any, name: string, score: number) {
	const response = await supabase.from('boule_infernal').insert({
		name: name,
		score: score,
	});
	if (response.status === 201) { return true; }
	return false;
}