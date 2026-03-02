<script lang="ts">
  export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
  <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold">Join AuthFlow</h1>
      <p class="text-gray-500 text-sm mt-2">
        Create your account to access secure services.
      </p>
    </div>

    <form method="POST" class="flex flex-col gap-5">

      <!-- Name -->
      <div>
        <label for="name" class="block mb-1 text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block mb-1 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minlength="6"
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
        <p class="text-xs text-gray-400 mt-1">
          Must be at least 6 characters.
        </p>
      </div>

      <!-- Error Message -->
      {#if form?.error}
        <div class="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
          {form.error}
        </div>
      {/if}

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
      >
        Create Account
      </button>

      <p class="text-sm text-center mt-3 text-gray-500">
        Already have an account?
        <a href="/login" class="text-black font-medium hover:underline">
          Login
        </a>
      </p>

    </form>

  </div>
</div>