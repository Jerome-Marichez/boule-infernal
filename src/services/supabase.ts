import { createClient } from '@supabase/supabase-js';
import { encryptData, decryptData } from "../utils/crypto";
import { regexUser } from '../utils/regex';
import { ScoreObject, Scores } from '../sharedTypes/score';

export class SupaBaseClient {

	private supabaseClient;

	constructor() {
		const supabaseUrl = 'https://urhlfvmxrgmupsrkfkhk.supabase.co';
		const supabaseKey = process.env.REACT_APP_API_KEY ?? "";

		this.supabaseClient = createClient(supabaseUrl, supabaseKey);
	}

	async readScore(): Promise<Scores> {
		const response = await this.supabaseClient.from('boule_infernal').select('*');
		const responseData = response.data ?? false;

		return responseData.filter((value: any) => {
			const isNameCorrect = regexUser.test(value.name);
			value.score = decryptData(value.score);
			value.score = Number.parseInt(value.score);

			return (value.score && isNameCorrect) ? true : false;
		})
	}

	async insertScore(scoreObject: ScoreObject) {
		const response = await this.supabaseClient.from('boule_infernal').insert({
			name: scoreObject.name,
			score: encryptData(scoreObject.score.toString()),
		});

		return response.status === 201 ? true : false
	}
}
