<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<a href="/" class="text-xl font-bold tracking-tight">
				<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
			</a>
			<a
				href="/login"
				class="text-sm text-gray-700 hover:text-black transition font-medium"
			>
				Back to Login
			</a>
		</div>
	</nav>

	<!-- Forgot Password Form -->
	<div class="flex items-center justify-center min-h-screen pt-20 px-4">
		<div class="w-full max-w-md">
			<div class="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
				<div class="text-center mb-8">
					<div
						class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mx-auto mb-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="white"
							class="w-7 h-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
							/>
						</svg>
					</div>
					<h1 class="text-3xl font-bold text-gray-900">Forgot Password</h1>
					<p class="text-gray-500 text-sm mt-2">
						Enter your email to receive a password reset link.
					</p>
				</div>

				{#if form?.success}
					<div
						class="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-sm text-center mb-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 inline-block mr-1 -mt-0.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						If an account exists with that email, a reset link has been sent.
					</div>
				{/if}

				{#if form?.error}
					<div
						class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center mb-5"
					>
						{form.error}
					</div>
				{/if}

				<form method="POST" class="flex flex-col gap-5" use:enhance>
					<div>
						<label for="email" class="block mb-1.5 text-sm font-medium text-gray-700"
							>Email</label
						>
						<input
							id="email"
							name="email"
							type="email"
							required
							class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
							placeholder="you@example.com"
						/>
					</div>

					<button
						type="submit"
						class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium"
					>
						Send Reset Link
					</button>

					<p class="text-sm text-center text-gray-500">
						Remember your password?
						<a href="/login" class="text-black font-medium hover:underline">Login</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>
