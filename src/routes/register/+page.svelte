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
			<div class="flex items-center gap-3">
				<span class="text-sm text-gray-500 hidden sm:inline">Already have an account?</span>
				<a
					href="/login"
					class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
				>
					Login
				</a>
			</div>
		</div>
	</nav>

	<!-- Two-column layout -->
	<div class="flex min-h-screen pt-16">
		<!-- Left brand panel (hidden on mobile) -->
		<div class="hidden md:flex md:w-[45%] lg:w-[42%] bg-gradient-to-br from-gray-900 to-black relative overflow-hidden items-center justify-center sticky top-0 h-screen">
			<!-- Decorative pattern -->
			<div class="absolute inset-0 opacity-5">
				<div class="absolute top-20 left-10 w-40 h-40 border border-white rounded-full"></div>
				<div class="absolute bottom-32 right-8 w-64 h-64 border border-white rounded-full"></div>
				<div class="absolute top-1/2 left-1/3 w-20 h-20 border border-white rounded-full"></div>
			</div>
			<!-- Subtle grid pattern -->
			<div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>

			<div class="relative z-10 px-12 lg:px-16 text-center">
				<div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/10">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-8 h-8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
					</svg>
				</div>
				<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">Get Started Today</h2>
				<p class="text-gray-400 text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
					Join thousands of companies using AuthFlow to build, scale, and secure their products.
				</p>
				<div class="flex justify-center gap-2 mt-10">
					<span class="w-8 h-1 bg-white/30 rounded-full"></span>
					<span class="w-8 h-1 bg-white rounded-full"></span>
					<span class="w-8 h-1 bg-white/30 rounded-full"></span>
				</div>
			</div>
		</div>

		<!-- Right form panel -->
		<div class="w-full md:w-[55%] lg:w-[58%] flex items-center justify-center px-4 py-12 md:px-8 lg:px-16">
			<div class="w-full max-w-md">
				<div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200">
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
									d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
								/>
							</svg>
						</div>
						<h1 class="text-3xl font-bold text-gray-900">Join AuthFlow</h1>
						<p class="text-gray-500 text-sm mt-2">
							Create your account to access secure services.
						</p>
					</div>

					<form method="POST" class="flex flex-col gap-5" use:enhance>
						<div>
							<label for="name" class="block mb-1.5 text-sm font-medium text-gray-700"
								>Full Name</label
							>
							<input
								id="name"
								name="name"
								type="text"
								required
								class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
								placeholder="John Doe"
							/>
						</div>

						<div>
							<label for="email" class="block mb-1.5 text-sm font-medium text-gray-700"
								>Email Address</label
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
								minlength="6"
								class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
								placeholder="Letters & numbers, min. 6 chars"
							/>
							<p class="text-xs text-gray-400 mt-1.5">Must be at least 6 characters with both letters and numbers.</p>
						</div>

						{#if form?.error}
							<div
								class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm text-center"
							>
								{form.error}
							</div>
						{/if}

						<button
							type="submit"
							class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium"
						>
							Create Account
						</button>

						<p class="text-sm text-center text-gray-500">
							Already have an account?
							<a href="/login" class="text-black font-medium hover:underline">Login</a>
						</p>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
