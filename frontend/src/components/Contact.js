

function Contact() {
  return (
    <>
      <section class="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter pt-16 border-t border-outline/10" id="contact">
<div class="md:col-span-5 flex flex-col gap-6">
<h3 class="font-headline-md text-headline-md text-primary">Get in touch</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                    Currently open for new opportunities or exciting project collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
<div class="flex gap-4 mt-4">
<a class="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="/">
<span class="material-symbols-outlined" data-icon="mail">mail</span>
</a>
<a class="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="/">
<span class="material-symbols-outlined" data-icon="code">code</span>
</a>
<a class="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="/">
<span class="material-symbols-outlined" data-icon="work">work</span>
</a>
</div>
</div>
<div class="md:col-span-1"></div>
<div class="md:col-span-6">
<form class="flex flex-col gap-6">
<div class="flex flex-col gap-2">
<label class="font-label-mono text-label-mono uppercase text-on-surface-variant">Name</label>
<input class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors" placeholder="John Doe" type="text"/>
</div>
<div class="flex flex-col gap-2">
<label class="font-label-mono text-label-mono uppercase text-on-surface-variant">Email</label>
<input class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors" placeholder="john@example.com" type="email"/>
</div>
<div class="flex flex-col gap-2 mt-4">
<label class="font-label-mono text-label-mono uppercase text-on-surface-variant">Message</label>
<textarea class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors resize-none" placeholder="How can we work together?" rows="4"></textarea>
</div>
<button class="mt-4 bg-primary text-on-primary px-8 py-4 rounded-none hover:bg-accent transition-colors duration-200 font-label-mono text-label-mono uppercase tracking-widest self-start" type="button">
                        Send Message
                    </button>
</form>
</div>
</section>
    </>
  )
}

export default Contact
