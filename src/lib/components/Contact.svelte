<script lang="ts">
  import { onMount } from 'svelte';
  import { fadeInUp, fadeInLeft, fadeInRight } from '$lib/animations/gsap';
  import { browser } from '$app/environment';

  // Form data
  let name = '';
  let email = '';
  let message = '';
  let isSubmitting = false;
  let submitSuccess = false;
  let submitError = false;

  // Elements for animation
  let contactHeading: HTMLElement;
  let contactSubheading: HTMLElement;
  let contactForm: HTMLElement;
  let contactInfo: HTMLElement;

  // Initialize animations
  onMount(() => {
    if (browser) {
      // Animate section heading
      fadeInUp(contactHeading, 0.2, 1);
      
      // Animate section subheading
      fadeInUp(contactSubheading, 0.4, 1);
      
      // Animate form
      fadeInLeft(contactForm, 0.6, 1);
      
      // Animate contact info
      fadeInRight(contactInfo, 0.6, 1);
    }
  });

  // Handle form submission
  async function handleSubmit() {
    isSubmitting = true;
    submitSuccess = false;
    submitError = false;

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      name = '';
      email = '';
      message = '';
      submitSuccess = true;
    } catch (error) {
      submitError = true;
      console.error('Error submitting form:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<section id="contact" class="py-20 md:py-28">
  <div class="container mx-auto px-4 md:px-6">
    <!-- Section Header -->
    <div class="flex flex-col gap-4 text-center mb-16">
      <h2 
        bind:this={contactHeading}
        class="text-3xl md:text-4xl lg:text-5xl font-bold"
      >
        Get In <span class="text-violet-400">Touch</span>
      </h2>
      <p 
        bind:this={contactSubheading}
        class="text-lg text-gray-400 max-w-2xl mx-auto"
      >
        Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
      </p>
    </div>
    
    <!-- Contact Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div 
        bind:this={contactForm}
        class="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
      >
        <h3 class="text-2xl font-semibold mb-6">Send a Message</h3>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <input
              type="text"
              id="name"
              bind:value={name}
              required
              class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
              placeholder="Your name"
            />
          </div>
          
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white"
              placeholder="your.email@example.com"
            />
          </div>
          
          <!-- Message Input -->
          <div>
            <label for="message" class="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea
              id="message"
              bind:value={message}
              required
              rows="5"
              class="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 text-white resize-none"
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-violet-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            {:else}
              Send Message
            {/if}
          </button>
          
          <!-- Success/Error Messages -->
          {#if submitSuccess}
            <div class="p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-400 text-sm">
              Your message has been sent successfully. I'll get back to you soon!
            </div>
          {/if}
          
          {#if submitError}
            <div class="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
              There was an error sending your message. Please try again later.
            </div>
          {/if}
        </form>
      </div>
      
      <!-- Contact Information -->
      <div 
        bind:this={contactInfo}
        class="flex flex-col justify-between"
      >
        <div class="space-y-8">
          <div>
            <h3 class="text-2xl font-semibold mb-6">Contact Information</h3>
            <p class="text-gray-400 mb-8">
              Feel free to reach out through any of the following channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
          
          <div class="space-y-6">
            <!-- Email -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                <i class="fa-regular fa-envelope text-violet-400"></i>
              </div>
              <div>
                <h4 class="text-lg font-medium text-white">Email</h4>
                <a href="mailto:contact@example.com" class="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                  contact@example.com
                </a>
              </div>
            </div>
            
            <!-- Location -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-location-dot text-violet-400"></i>
              </div>
              <div>
                <h4 class="text-lg font-medium text-white">Location</h4>
                <p class="text-gray-400">Remote, Worldwide</p>
              </div>
            </div>
            
            <!-- Availability -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                <i class="fa-regular fa-clock text-violet-400"></i>
              </div>
              <div>
                <h4 class="text-lg font-medium text-white">Availability</h4>
                <p class="text-gray-400">Full-time / Freelance</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Social Links -->
        <div class="mt-12">
          <h4 class="text-lg font-medium text-white mb-4">Connect with me</h4>
          <div class="flex gap-4">
            <a 
              href="https://www.linkedin.com/in/muhammad-huzaifa-ali-49aa94259/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a 
              href="https://github.com/rogueinnovator" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
              aria-label="GitHub"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a 
              href="https://www.threads.net/@rogue_innovator?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
              aria-label="Threads"
            >
              <i class="fa-brands fa-threads"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> 