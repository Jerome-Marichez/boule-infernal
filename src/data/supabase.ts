import { createClient } from '@supabase/supabase-js';
import { encryptData, decryptData } from "../utils/crypto";
import { regexUser } from '../utils/regex';
import { ScoreObject } from '../sharedTypes/score';


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

	if (!responseData && response.status !== 200) { return false; };

	return responseData.filter((value: any) => {
		const isNameCorrect = regexUser.test(value.name);
		value.score = decryptData(value.score);
		value.score = Number.parseInt(value.score);

		if (value.score && isNameCorrect) {
			return true;
		}
		return false;
	})
}

/**
 * Insert a row into the table "boule_infernal" with Supabase
 * @param supabase A Supabase client
 * @param scoreObject The score object with name propriety as a string & score propriety as a number 
 * @returns True if the values were inserted successfully, false if an error occurred.
 */
export async function insertScore(supabase: any, scoreObject: ScoreObject) {
	const response = await supabase.from('boule_infernal').insert({
		name: scoreObject.name,
		score: encryptData(scoreObject.score.toString()),
	});
	if (response.status === 201) { return true; }
	return false;
}