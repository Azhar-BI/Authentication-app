<script lang="ts">
  let { data } = $props();
  let mobileMenuOpen = $state(false);

  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications built with modern frameworks for performance, scalability, and seamless user experience.",
      icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to keep your business agile, secure, and always available.",
      icon: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security audits, penetration testing, and compliance solutions to protect your digital assets.",
      icon: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    },
    {
      title: "Data Analytics",
      description: "Turn raw data into actionable insights with our advanced analytics, dashboards, and business intelligence tools.",
      icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications designed for performance, usability, and engagement.",
      icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h6"
    },
    {
      title: "IT Consulting",
      description: "Strategic technology consulting to align your IT infrastructure with business goals and drive digital transformation.",
      icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    }
  ];

  const stats = [
    { value: "200+", label: "Projects Delivered" },
    { value: "50+", label: "Team Members" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Support Available" }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "CTO, FinEdge",
      quote: "AuthFlow transformed our infrastructure. Their cloud solutions reduced our operational costs by 40% while improving reliability."
    },
    {
      name: "James Rodriguez",
      role: "Founder, ShopNova",
      quote: "The web application they built handles millions of transactions seamlessly. Their team is technically brilliant and a joy to work with."
    },
    {
      name: "Emily Chen",
      role: "VP Engineering, MedSync",
      quote: "Their cybersecurity audit uncovered critical vulnerabilities we had missed. We now have complete confidence in our security posture."
    }
  ];
</script>

<!-- Navbar -->
<nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-xl font-bold tracking-tight">
      <span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
    </a>
    <div class="hidden md:flex items-center gap-8 text-sm text-gray-600">
      <a href="#services" class="hover:text-black transition">Services</a>
      <a href="#about" class="hover:text-black transition">About</a>
      <a href="#testimonials" class="hover:text-black transition">Testimonials</a>
      <a href="#contact" class="hover:text-black transition">Contact</a>
    </div>
    <div class="hidden md:flex items-center gap-3">
      {#if data.user}
        <a href="/dashboard" class="text-sm text-gray-700 hover:text-black transition font-medium">
          Dashboard
        </a>
        <form method="POST" action="/logout">
          <button
            type="submit"
            class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Logout
          </button>
        </form>
      {:else}
        <a href="/login" class="text-sm text-gray-700 hover:text-black transition font-medium">
          Login
        </a>
        <a
          href="/register"
          class="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Get Started
        </a>
      {/if}
    </div>

    <!-- Mobile hamburger button -->
    <button
      class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
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
</nav>

<!-- Mobile menu overlay -->
{#if mobileMenuOpen}
  <div class="fixed inset-0 z-40 md:hidden">
    <!-- Backdrop -->
    <button
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onclick={() => mobileMenuOpen = false}
      aria-label="Close menu"
    ></button>

    <!-- Menu panel -->
    <div class="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span class="text-lg font-bold tracking-tight">
          <span class="text-black">Auth</span><span class="text-gray-500">Flow</span>
        </span>
        <button
          class="w-10 h-10 rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
          onclick={() => mobileMenuOpen = false}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="flex flex-col px-6 py-6 gap-1">
        <a href="#services" class="py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition font-medium" onclick={() => mobileMenuOpen = false}>Services</a>
        <a href="#about" class="py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition font-medium" onclick={() => mobileMenuOpen = false}>About</a>
        <a href="#testimonials" class="py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition font-medium" onclick={() => mobileMenuOpen = false}>Testimonials</a>
        <a href="#contact" class="py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition font-medium" onclick={() => mobileMenuOpen = false}>Contact</a>
      </nav>

      <div class="mt-auto px-6 pb-8 flex flex-col gap-3">
        {#if data.user}
          <a href="/dashboard" class="text-center py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:border-black hover:text-black transition font-medium text-sm">
            Dashboard
          </a>
          <form method="POST" action="/logout">
            <button type="submit" class="w-full py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium text-sm">
              Logout
            </button>
          </form>
        {:else}
          <a href="/login" class="text-center py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:border-black hover:text-black transition font-medium text-sm">
            Login
          </a>
          <a href="/register" class="text-center py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium text-sm">
            Get Started
          </a>
        {/if}
      </div>
    </div>
  </div>
{/if}

<!-- Hero Section -->
<section class="min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
  <div class="max-w-6xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
        Trusted by 200+ Companies
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
        Technology Solutions That
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
          Drive Growth
        </span>
      </h1>
      <p class="text-gray-600 mt-6 text-base md:text-lg leading-relaxed max-w-lg">
        We design, build, and scale digital products and infrastructure that help businesses
        thrive in the modern world. From web apps to cloud architecture — we've got you covered.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a
          href="/register"
          class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium text-sm"
        >
          Start a Project
        </a>
        <a
          href="#services"
          class="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-black hover:text-black transition font-medium text-sm"
        >
          Explore Services
        </a>
      </div>
    </div>
    <div class="hidden md:flex justify-center">
      <div class="relative w-80 h-80">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl rotate-6"></div>
        <div class="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-center items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          <p class="text-2xl font-bold text-gray-900">AuthFlow</p>
          <p class="text-sm text-gray-500 text-center">Enterprise-grade solutions for modern businesses</p>
          <div class="flex gap-2 mt-2">
            <span class="w-3 h-3 bg-black rounded-full"></span>
            <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span class="w-3 h-3 bg-gray-300 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats Bar -->
<section class="bg-black text-white py-12">
  <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {#each stats as stat}
      <div>
        <p class="text-3xl md:text-4xl font-bold">{stat.value}</p>
        <p class="text-gray-400 text-sm mt-1">{stat.label}</p>
      </div>
    {/each}
  </div>
</section>

<!-- Services Section -->
<section id="services" class="py-24 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-16">
      <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What We Do</p>
      <h2 class="text-4xl font-bold text-gray-900">Our Services</h2>
      <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
        We deliver end-to-end technology services tailored to your business needs, helping you innovate faster and operate smarter.
      </p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each services as service}
        <div class="group border border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-lg transition-all duration-300">
          <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-black transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d={service.icon} />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{service.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- About Section -->
<section id="about" class="py-24 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    <div>
      <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">About Us</p>
      <h2 class="text-4xl font-bold text-gray-900 mb-6">Built on Trust, Driven by Innovation</h2>
      <p class="text-gray-600 leading-relaxed mb-4">
        AuthFlow is a full-service technology company helping startups and enterprises build, scale, and secure their digital products. With over a decade of experience, our team of engineers, designers, and strategists delivers solutions that make a real impact.
      </p>
      <p class="text-gray-600 leading-relaxed mb-8">
        We believe in transparent partnerships, clean code, and measurable results. Every project starts with understanding your goals and ends with exceeding your expectations.
      </p>
      <div class="flex flex-wrap gap-4">
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-3">
          <p class="text-2xl font-bold text-gray-900">10+</p>
          <p class="text-xs text-gray-500">Years in Business</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-3">
          <p class="text-2xl font-bold text-gray-900">15+</p>
          <p class="text-xs text-gray-500">Industries Served</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-3">
          <p class="text-2xl font-bold text-gray-900">98%</p>
          <p class="text-xs text-gray-500">Client Retention</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Why Choose AuthFlow?</h3>
      <ul class="space-y-4">
        <li class="flex items-start gap-3">
          <span class="mt-1 flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </span>
          <p class="text-gray-600 text-sm">Agile development with weekly progress demos and transparent communication</p>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </span>
          <p class="text-gray-600 text-sm">Security-first approach with SOC 2 compliance and regular audits</p>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </span>
          <p class="text-gray-600 text-sm">Scalable architecture designed for growth from day one</p>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="w-3 h-3"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
          </span>
          <p class="text-gray-600 text-sm">Dedicated support team with 24/7 monitoring and rapid incident response</p>
        </li>
      </ul>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="py-24 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-16">
      <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Testimonials</p>
      <h2 class="text-4xl font-bold text-gray-900">What Our Clients Say</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      {#each testimonials as testimonial}
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <div class="flex gap-1 mb-4">
            {#each Array(5) as _}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-yellow-500">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
              </svg>
            {/each}
          </div>
          <p class="text-gray-600 text-sm leading-relaxed mb-6">"{testimonial.quote}"</p>
          <div>
            <p class="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
            <p class="text-gray-500 text-xs">{testimonial.role}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section id="contact" class="py-24 bg-black text-white">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-4xl font-bold mb-4">Ready to Build Something Great?</h2>
    <p class="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
      Let's discuss how AuthFlow can help you achieve your technology goals. Get started with a free consultation today.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a
        href="/register"
        class="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
      >
        Get Started Free
      </a>
      <a
        href="mailto:hello@authflow.dev"
        class="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:border-white hover:text-white transition font-medium text-sm"
      >
        Contact Sales
      </a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="bg-gray-950 text-gray-400 py-16">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
      <div class="col-span-2 md:col-span-1">
        <p class="text-white font-bold text-lg mb-4">
          <span class="text-white">Auth</span><span class="text-gray-500">Flow</span>
        </p>
        <p class="text-sm leading-relaxed">
          Enterprise-grade technology solutions for businesses that want to move fast and stay secure.
        </p>
      </div>
      <div>
        <p class="text-white font-semibold text-sm mb-4">Services</p>
        <ul class="space-y-2 text-sm">
          <li><a href="#services" class="hover:text-white transition">Web Development</a></li>
          <li><a href="#services" class="hover:text-white transition">Cloud Solutions</a></li>
          <li><a href="#services" class="hover:text-white transition">Cybersecurity</a></li>
          <li><a href="#services" class="hover:text-white transition">Data Analytics</a></li>
        </ul>
      </div>
      <div>
        <p class="text-white font-semibold text-sm mb-4">Company</p>
        <ul class="space-y-2 text-sm">
          <li><a href="#about" class="hover:text-white transition">About</a></li>
          <li><a href="#testimonials" class="hover:text-white transition">Testimonials</a></li>
          <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
          <li><a href="/login" class="hover:text-white transition">Client Portal</a></li>
        </ul>
      </div>
      <div>
        <p class="text-white font-semibold text-sm mb-4">Connect</p>
        <ul class="space-y-2 text-sm">
          <li><a href="mailto:hello@authflow.dev" class="hover:text-white transition">hello@authflow.dev</a></li>
          <li><a href="#" class="hover:text-white transition">LinkedIn</a></li>
          <li><a href="#" class="hover:text-white transition">GitHub</a></li>
          <li><a href="#" class="hover:text-white transition">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
      <p>&copy; 2026 AuthFlow. All rights reserved.</p>
      <div class="flex gap-6 mt-4 md:mt-0">
        <a href="#" class="hover:text-white transition">Privacy Policy</a>
        <a href="#" class="hover:text-white transition">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
