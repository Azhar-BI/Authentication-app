<script lang="ts">
	let { data } = $props();

	function getInitials(name: string | undefined, email: string | undefined): string {
		if (name) {
			return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
		}
		return (email?.[0] || 'U').toUpperCase();
	}

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div>
	<!-- Welcome Banner -->
	<div class="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
		<!-- Decorative elements -->
		<div class="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
		<div class="absolute bottom-0 right-20 w-24 h-24 bg-white/5 rounded-full translate-y-1/2"></div>

		<div class="relative z-10 flex items-center gap-5">
			<div class="hidden sm:flex w-14 h-14 bg-white/10 rounded-2xl items-center justify-center text-white text-xl font-bold backdrop-blur-sm border border-white/10 flex-shrink-0">
				{getInitials(data.user?.name, data.user?.email)}
			</div>
			<div>
				<h1 class="text-2xl md:text-3xl font-bold">
					Welcome, {data.user?.name || 'User'}!
				</h1>
				<p class="text-gray-400 mt-1 text-sm md:text-base">{today}</p>
			</div>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
		<!-- Name Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
		>
			<div
				class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
			<p class="text-lg font-semibold text-gray-900">{data.user?.name || 'Not set'}</p>
		</div>

		<!-- Email Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
		>
			<div
				class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
			<p class="text-lg font-semibold text-gray-900 break-all">{data.user?.email}</p>
		</div>

		<!-- Verification Status Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
		>
			<div
				class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 {data
					.user?.emailVerified
					? 'bg-green-100 group-hover:bg-green-600'
					: 'bg-yellow-100 group-hover:bg-yellow-500'}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
					class="w-5 h-5 transition-colors duration-300 {data.user?.emailVerified
						? 'text-green-600 group-hover:text-white'
						: 'text-yellow-600 group-hover:text-white'}">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email Status</p>
			{#if data.user?.emailVerified}
				<p class="text-lg font-semibold text-green-600">Verified</p>
			{:else}
				<p class="text-lg font-semibold text-yellow-600">Not Verified</p>
			{/if}
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="mb-8">
		<h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<a
				href="/dashboard/profile"
				class="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 group"
			>
				<div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
					</svg>
				</div>
				<div>
					<p class="font-medium text-gray-900">Edit Profile</p>
					<p class="text-sm text-gray-500">Update your name and details</p>
				</div>
			</a>

			<a
				href="/dashboard/profile"
				class="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 group"
			>
				<div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors duration-300">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
						class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
					</svg>
				</div>
				<div>
					<p class="font-medium text-gray-900">Change Password</p>
					<p class="text-sm text-gray-500">Keep your account secure</p>
				</div>
			</a>

			<form method="POST" action="/logout" class="contents">
				<button
					type="submit"
					class="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 group text-left w-full"
				>
					<div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
							class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
						</svg>
					</div>
					<div>
						<p class="font-medium text-gray-900">Sign Out</p>
						<p class="text-sm text-gray-500">End your current session</p>
					</div>
				</button>
			</form>
		</div>
	</div>

	<!-- Account Security Section -->
	<div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
		<h2 class="text-lg font-semibold text-gray-900 mb-5">Account Security</h2>
		<div class="divide-y divide-gray-100">
			<div class="flex items-center justify-between py-4 first:pt-0 last:pb-0">
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4.5 h-4.5 text-gray-600">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
						</svg>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900">Email Verification</p>
						<p class="text-xs text-gray-500">Verify your email to unlock full access</p>
					</div>
				</div>
				{#if data.user?.emailVerified}
					<span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
						<span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
						Verified
					</span>
				{:else}
					<span class="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
						<span class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
						Pending
					</span>
				{/if}
			</div>

			<div class="flex items-center justify-between py-4">
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4.5 h-4.5 text-gray-600">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
						</svg>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900">Password</p>
						<p class="text-xs text-gray-500">Secure your account with a strong password</p>
					</div>
				</div>
				<span class="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
					<span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
					Set
				</span>
			</div>

			<div class="flex items-center justify-between py-4 last:pb-0">
				<div class="flex items-center gap-3">
					<div class="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4.5 h-4.5 text-gray-600">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
						</svg>
					</div>
					<div>
						<p class="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
						<p class="text-xs text-gray-500">Add an extra layer of security</p>
					</div>
				</div>
				<span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
					Coming Soon
				</span>
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
		<p>AuthFlow &mdash; Secure Authentication Platform</p>
		<p>Logged in as <span class="text-gray-600 font-medium">{data.user?.email}</span></p>
	</div>
</div>
