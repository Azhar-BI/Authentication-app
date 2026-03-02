<script lang="ts">
  export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold">Welcome Back</h1>
      <p class="text-gray-500 text-sm mt-2">
        Login to your AuthFlow account.
      </p>
    </div>

    <form method="POST" class="flex flex-col gap-5">

      <div>
        <label for="email" class="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label for="password" class="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {#if form?.error}
        <div class="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
          {form.error}
        </div>
      {/if}

      <button
        type="submit"
        class="bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
      >
        Login
      </button>

      <p class="text-sm text-center mt-3 text-gray-500">
        Don’t have an account?
        <a href="/register" class="text-black font-medium hover:underline">
          Register
        </a>
      </p>

    </form>

  </div>
</div>