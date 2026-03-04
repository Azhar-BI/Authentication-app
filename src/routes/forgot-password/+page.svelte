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
						<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
					</svg>
				</div>
				<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">Reset Your Password</h2>
				<p class="text-gray-400 text-base lg:text-lg leading-relaxed max-w-sm mx-auto">
					No worries, it happens to the best of us. We'll send you a link to get back into your account.
				</p>
				<div class="flex justify-center gap-2 mt-10">
					<span class="w-8 h-1 bg-white/30 rounded-full"></span>
					<span class="w-8 h-1 bg-white/30 rounded-full"></span>
					<span class="w-8 h-1 bg-white rounded-full"></span>
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
</div>
