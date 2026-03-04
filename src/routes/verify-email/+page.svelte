<script lang="ts">
	let { data } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<a href="/" class="text-xl font-bold tracking-tight">
				<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
			</a>
			<a href="/login" class="text-sm text-gray-700 hover:text-black transition font-medium">
				Go to Login
			</a>
		</div>
	</nav>

	<!-- Verification Result -->
	<div class="flex items-center justify-center min-h-screen pt-20 px-4">
		<div class="w-full max-w-md animate-[fadeInUp_0.5s_ease-out]">
			<div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200 text-center">
				{#if data.success}
					<div
						class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8 text-green-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</div>
					<h1 class="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
					<p class="text-gray-500 mb-8">
						Your email has been verified successfully. You can now login to your account.
					</p>
					<a
						href="/login"
						class="inline-block bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
					>
						Go to Login
					</a>
				{:else}
					<div
						class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8 text-red-500"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
							/>
						</svg>
					</div>
					<h1 class="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
					<p class="text-gray-500 mb-8">{data.error}</p>
					<a
						href="/login"
						class="inline-block bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
					>
						Go to Login
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
