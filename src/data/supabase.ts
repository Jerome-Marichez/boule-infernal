import { createClient } from '@supabase/supabase-js';
import { encryptData, decryptData } from "../utils/crypto";

/**
 * @returns A supabase client connected to the database
 */
export function connectSupaBase() {
	const supabaseUrl = 'https://urhlfvmxrgmupsrkfkhk.supabase.co';
	const supabaseKey = process.env.REACT_APP_API_KEY ?? "";
	return createClient(supabaseUrl, supabaseKey);
}

/**
 * @param supabase A Supabase client
 * @returns Return all data from the database as a array of object or return false if the operation fails.
 */
export async function readScore(supabase: any) {
	const response = await supabase.from('boule_infernal').select('*');
	const responseData = response.data ?? false;

	if (responseData && response.status === 200) {
		const dataDecrypted = responseData.map((value) => {
			value.score = decryptData(value.score);
			value.score = Number(value.score);
			return value;
		})
		return dataDecrypted;
	};

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
		score: encryptData(score.toString()),
	});
	if (response.status === 201) { return true; }
	return false;
}