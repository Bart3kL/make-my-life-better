export async function logout() {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			return response;
		} else {
			console.error("Failed to logout:", response.statusText);
		}
	} catch (error) {
		console.error("An error occurred during logout:", error);
	}
}
