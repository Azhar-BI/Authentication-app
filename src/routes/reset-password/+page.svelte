<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<a href="/" class="text-xl font-bold tracking-tight">
				<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
			</a>
			<a href="/login" class="text-sm text-gray-700 hover:text-black transition font-medium">
				Back to Login
			</a>
		</div>
	</nav>

	<!-- Reset Password Form -->
	<div class="flex items-center justify-center min-h-screen pt-20 px-4">
		<div class="w-full max-w-md">
			<div class="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
				{#if !data.valid}
					<div class="text-center">
						<div
							class="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-7 h-7 text-red-500"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
								/>
							</svg>
						</div>
						<h1 class="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
						<p class="text-gray-500 mb-6">{data.error}</p>
						<a
							href="/forgot-password"
							class="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
						>
							Request New Link
						</a>
					</div>
				{:else}
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
									d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
								/>
							</svg>
						</div>
						<h1 class="text-3xl font-bold text-gray-900">Reset Password</h1>
						<p class="text-gray-500 text-sm mt-2">Enter your new password below.</p>
					</div>

					{#if form?.error}
						<div
							class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center mb-5"
						>
							{form.error}
						</div>
					{/if}

					<form method="POST" class="flex flex-col gap-5" use:enhance>
						<input type="hidden" name="token" value={data.token} />
						<input type="hidden" name="email" value={data.email} />

						<div>
							<label for="password" class="block mb-1.5 text-sm font-medium text-gray-700"
								>New Password</label
							>
							<input
								id="password"
								name="password"
								type="password"
								required
								minlength="6"
								class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
								placeholder="Min. 6 characters"
							/>
							<p class="text-xs text-gray-400 mt-1.5">Must be at least 6 characters.</p>
						</div>

						<button
							type="submit"
							class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium"
						>
							Reset Password
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
