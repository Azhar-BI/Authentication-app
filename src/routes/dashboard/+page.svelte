<script lang="ts">
	let { data } = $props();
</script>

<div>
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">
			Welcome, {data.user?.name || 'User'}!
		</h1>
		<p class="text-gray-500 mt-2">Here's an overview of your account.</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<!-- Name Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
		>
			<div
				class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					/>
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name</p>
			<p class="text-lg font-semibold text-gray-900">{data.user?.name || 'Not set'}</p>
		</div>

		<!-- Email Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
		>
			<div
				class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-black transition-colors duration-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
					/>
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
			<p class="text-lg font-semibold text-gray-900">{data.user?.email}</p>
		</div>

		<!-- Verification Status Card -->
		<div
			class="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
		>
			<div
				class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 {data
					.user?.emailVerified
					? 'bg-green-100 group-hover:bg-green-600'
					: 'bg-yellow-100 group-hover:bg-yellow-500'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 transition-colors duration-300 {data.user?.emailVerified
						? 'text-green-600 group-hover:text-white'
						: 'text-yellow-600 group-hover:text-white'}"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
					/>
				</svg>
			</div>
			<p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
				Email Status
			</p>
			{#if data.user?.emailVerified}
				<p class="text-lg font-semibold text-green-600">Verified</p>
			{:else}
				<p class="text-lg font-semibold text-yellow-600">Not Verified</p>
			{/if}
		</div>
	</div>

	<div class="mt-10">
		<a
			href="/dashboard/profile"
			class="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-4 h-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
				/>
			</svg>
			Edit Profile
		</a>
	</div>
</div>
