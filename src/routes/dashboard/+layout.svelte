<script lang="ts">
	import { page } from '$app/stores';

	let { children, data } = $props();
	let mobileMenuOpen = $state(false);

	function getInitials(name: string | undefined, email: string | undefined): string {
		if (name) {
			return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
		}
		return (email?.[0] || 'U').toUpperCase();
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
	<!-- Navbar -->
	<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
		<div class="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
			<div class="flex items-center gap-8">
				<a href="/" class="text-xl font-bold tracking-tight">
					<span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
				</a>
				<div class="hidden sm:flex items-center gap-1 text-sm">
					<a
						href="/dashboard"
						class="px-3 py-1.5 rounded-lg font-medium transition {$page.url.pathname === '/dashboard'
							? 'text-black bg-gray-100'
							: 'text-gray-500 hover:text-black hover:bg-gray-50'}"
					>
						Dashboard
					</a>
					<a
						href="/dashboard/profile"
						class="px-3 py-1.5 rounded-lg font-medium transition {$page.url.pathname === '/dashboard/profile'
							? 'text-black bg-gray-100'
							: 'text-gray-500 hover:text-black hover:bg-gray-50'}"
					>
						Profile
					</a>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="hidden md:flex items-center gap-3">
					<!-- <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-semibold">
						{getInitials(data.user?.name, data.user?.email)}
					</div>
					<span class="text-sm text-gray-500">{data.user?.email}</span>
				</div> -->
				<form method="POST" action="/logout" class="hidden sm:block">
					<button
						type="submit"
						class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
					>
						Logout
					</button>
				</form>

				<!-- Mobile hamburger button -->
				<button
					class="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					aria-label="Toggle menu"
				>
					{#if mobileMenuOpen}
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</nav>

	<!-- Mobile menu overlay -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-40 sm:hidden">
			<!-- Backdrop -->
			<button
				class="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onclick={() => mobileMenuOpen = false}
				aria-label="Close menu"
			></button>

			<!-- Menu panel -->
			<div class="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col">
				<div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-semibold">
							{getInitials(data.user?.name, data.user?.email)}
						</div>
						<div class="min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate">{data.user?.name || 'User'}</p>
							<p class="text-xs text-gray-500 truncate">{data.user?.email}</p>
						</div>
					</div>
					<button
						class="w-10 h-10 rounded-lg hover:bg-gray-100 transition flex items-center justify-center flex-shrink-0"
						onclick={() => mobileMenuOpen = false}
						aria-label="Close menu"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<nav class="flex flex-col px-6 py-6 gap-1">
					<a
						href="/dashboard"
						class="py-3 px-4 rounded-xl transition font-medium {$page.url.pathname === '/dashboard'
							? 'text-black bg-gray-100'
							: 'text-gray-700 hover:bg-gray-50 hover:text-black'}"
						onclick={() => mobileMenuOpen = false}
					>
						<span class="flex items-center gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
							</svg>
							Dashboard
						</span>
					</a>
					<a
						href="/dashboard/profile"
						class="py-3 px-4 rounded-xl transition font-medium {$page.url.pathname === '/dashboard/profile'
							? 'text-black bg-gray-100'
							: 'text-gray-700 hover:bg-gray-50 hover:text-black'}"
						onclick={() => mobileMenuOpen = false}
					>
						<span class="flex items-center gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
							</svg>
							Profile
						</span>
					</a>
				</nav>

				<div class="mt-auto px-6 pb-8">
					<form method="POST" action="/logout">
						<button type="submit" class="w-full py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium text-sm">
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	{/if}

	<!-- Content -->
	<main class="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-12">
		{@render children()}
	</main>
</div>
