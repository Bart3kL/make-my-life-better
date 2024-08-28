import { sql } from "@vercel/postgres";
import { type NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/lib/getDataFromToken";

export async function GET(req: NextRequest) {
	try {
		const userEmail = getDataFromToken(req) as string;
		if (!userEmail) {
			return NextResponse.json(
				{ success: false, message: "You are not authorized" },
				{ status: 401 },
			);
		}

		const userResult = await sql`SELECT * FROM users WHERE email = ${userEmail}`;
		if (userResult.rows.length === 0) {
			return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
		}

		const user = userResult.rows[0];

		delete user.password;

		return NextResponse.json({ success: true, user }, { status: 200 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
