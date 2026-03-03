<script lang="ts">
	import { page } from '$app/stores';

	let { children, data } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<div class="flex items-center gap-8">
				<a href="/" class="text-xl font-bold tracking-tight">
					<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
				</a>
				<div class="hidden sm:flex items-center gap-6 text-sm">
					<a
						href="/dashboard"
						class="font-medium transition {$page.url.pathname === '/dashboard'
							? 'text-black'
							: 'text-gray-500 hover:text-black'}"
					>
						Dashboard
					</a>
					<a
						href="/dashboard/profile"
						class="font-medium transition {$page.url.pathname === '/dashboard/profile'
							? 'text-black'
							: 'text-gray-500 hover:text-black'}"
					>
						Profile
					</a>
				</div>
			</div>
			<div class="flex items-center gap-4">
				<span class="text-sm text-gray-500 hidden md:inline">{data.user?.email}</span>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
					>
						Logout
					</button>
				</form>
			</div>
		</div>
	</nav>

	<!-- Content -->
	<main class="max-w-6xl mx-auto px-6 pt-24 pb-12">
		{@render children()}
	</main>
</div>
