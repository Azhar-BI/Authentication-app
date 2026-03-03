<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let form;

	$: registered = $page.url.searchParams.get('registered') === 'true';
	$: reset = $page.url.searchParams.get('reset') === 'true';
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<a href="/" class="text-xl font-bold tracking-tight">
				<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
			</a>
			<div class="flex items-center gap-3">
				<span class="text-sm text-gray-500 hidden sm:inline">Don't have an account?</span>
				<a
					href="/register"
					class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
				>
					Register
				</a>
			</div>
		</div>
	</nav>

	<!-- Login Form -->
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
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
					</div>
					<h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
					<p class="text-gray-500 text-sm mt-2">Login to your AuthFlow account.</p>
				</div>

				{#if registered}
					<div
						class="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm text-center mb-5"
					>
						Account created! Please check your email to verify, then login.
					</div>
				{/if}

				{#if reset}
					<div
						class="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm text-center mb-5"
					>
						Password reset successful! You can now login with your new password.
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

					<div>
						<label for="password" class="block mb-1.5 text-sm font-medium text-gray-700"
							>Password</label
						>
						<input
							id="password"
							name="password"
							type="password"
							required
							class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
							placeholder="Enter your password"
						/>
					</div>

					{#if form?.error}
						<div class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center">
							{form.error}
						</div>
					{/if}

					<button
						type="submit"
						class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium"
					>
						Login
					</button>

					<div class="text-sm text-center text-gray-500">
						<a href="/forgot-password" class="text-black font-medium hover:underline"
							>Forgot Password?</a
						>
					</div>

					<p class="text-sm text-center text-gray-500">
						Don't have an account?
						<a href="/register" class="text-black font-medium hover:underline">Register</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>
