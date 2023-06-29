import { readScore, insertScore, connectSupaBase } from "../../data/supabase";

describe('Database Tests', () => {
	test('Read Data Successfully', async () => {
		const result = await readScore(connectSupaBase());
		expect(result).toBeTruthy();
	});

	test('Insert Data Successfully', async () => {
		const result = await insertScore(connectSupaBase(), {
			name: "JEST",
			score: 0,
		});
		expect(result).toBeTruthy();
	});

	test('Unable Read Data Successfully', async () => {
		jest.spyOn(require('@supabase/supabase-js'), 'createClient').mockReturnValue({
			from: () => ({
				select: () => ({
					data: null,
					error: 'Unable to read data from the database',
					status: 500,
				}),
			}),
		});

		const result = await readScore(connectSupaBase());
		expect(result).toBeFalsy();
	});

});