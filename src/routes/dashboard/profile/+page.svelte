<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	function getInitials(name: string | undefined, email: string | undefined): string {
		if (name) {
			return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
		}
		return (email?.[0] || 'U').toUpperCase();
	}
</script>

<div>
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">Edit Profile</h1>
		<p class="text-gray-500 mt-2">Update your personal information.</p>
	</div>

	<div class="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-xl">
		<!-- Avatar and user info header -->
		<div class="flex items-center gap-4 pb-6 mb-6 border-b border-gray-100">
			<div class="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
				{getInitials(data.user?.name, data.user?.email)}
			</div>
			<div class="min-w-0">
				<p class="font-semibold text-gray-900 truncate">{data.user?.name || 'User'}</p>
				<p class="text-sm text-gray-500 truncate">{data.user?.email}</p>
			</div>
		</div>

		{#if form?.success}
			<div
				class="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm mb-6 flex items-center gap-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 flex-shrink-0"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				Profile updated successfully!
			</div>
		{/if}

		{#if form?.error}
			<div
				class="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-6 flex items-center gap-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 flex-shrink-0"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
				{form.error}
			</div>
		{/if}

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
					value={data.user?.name || ''}
					class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
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
					value={data.user?.email || ''}
					class="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
				/>
			</div>

			<button
				type="submit"
				class="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium flex items-center justify-center gap-2"
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
						d="m4.5 12.75 6 6 9-13.5"
					/>
				</svg>
				Save Changes
			</button>
		</form>
	</div>
</div>
