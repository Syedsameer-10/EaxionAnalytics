import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ALL_COURSES } from "@/data/content";
import { Mail, Linkedin, Youtube, Facebook, MessageSquare, Send, Instagram } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

export default function Connect() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getCourseFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("course") || "";
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: getCourseFromUrl(),
      message: "",
    },
  });
  
  useEffect(() => {
     const courseId = getCourseFromUrl();
     if(courseId) form.setValue("course", courseId);
  }, []);

 // ✅ ONLY THIS FUNCTION IS FIXED
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // ✅ READ JSON ONCE
      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data?.message || "Failed to submit application",
          variant: "destructive",
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Application Submitted!",
        description: "Check your email for confirmation details.",
      });

      console.log("Application submitted successfully:", data);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const socialLinks = [
    { name: "Email", icon: Mail, value: "admissions@eaxion.com", url: "mailto:admissions@eaxion.com", color: "text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, value: "linkedin.com/in/arvindaxion", url: "https://www.linkedin.com/in/arvindaxion", color: "text-blue-600" },
    { name: "Instagram", icon: Instagram, value: "@arvind_axion", url: "https://www.instagram.com/arvind_axion/", color: "text-pink-500" },
    { name: "YouTube", icon: Youtube, value: "youtube.com/@arvindandswamy", url: "https://youtube.com/@arvindandswamy", color: "text-red-600" },
    { name: "Facebook", icon: Facebook, value: "facebook.com/arvindaxion", url: "https://www.facebook.com/profile.php?id=100068014312188", color: "text-blue-800" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             <motion.div
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-5"
             >
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none">JOIN OUR <br /><span className="text-gradient">ECOSYSTEM</span></h1>
                
                <div className="space-y-4 mb-12">
                   {socialLinks.map((social, idx) => (
                     <a 
                       key={social.name} 
                       href={social.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 block"
                     >
                        <div className={`p-3 rounded-xl bg-white/5 ${social.color}`}>
                           <social.icon className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{social.name}</div>
                           <div className="font-bold text-lg">{social.value}</div>
                        </div>
                     </a>
                   ))}
                </div>

                <motion.a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-3xl bg-green-600 hover:bg-green-500 text-white font-black text-xl shadow-lg transition-all"
                >
                   <MessageSquare className="w-6 h-6" />
                   CHAT WITH US NOW
                </motion.a>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-7"
             >
               {isSuccess ? (
                 <div className="relative h-full min-h-[600px] rounded-[3rem] overflow-hidden group p-8 md:p-12 flex items-center justify-center"
                      onMouseMove={(e) => {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        (e.currentTarget as HTMLElement).style.setProperty('--glow-x', `${x}px`);
                        (e.currentTarget as HTMLElement).style.setProperty('--glow-y', `${y}px`);
                      }}>
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] rounded-[3rem]"
                     style={{
                       background: `radial-gradient(circle 600px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(16, 185, 129, 0.2), transparent 70%)`
                     }}
                   />
                   <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem]" />
                   <div className="relative z-10 text-center">
                     <motion.div 
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.2, type: "spring" }}
                       className="w-24 h-24 bg-gradient-to-br from-primary/40 to-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20"
                     >
                       <Send className="w-10 h-10" />
                     </motion.div>
                     <motion.h2 
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                       className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent"
                     >
                       Transmission<br/>Successful
                     </motion.h2>
                     <motion.p 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.4 }}
                       className="text-slate-300 mb-8 text-lg max-w-md mx-auto"
                     >
                       Your application has been received by our intelligence team.
                     </motion.p>
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                     >
                       <Button onClick={() => { setIsSuccess(false); form.reset(); }} className="h-14 px-12 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90">New Registration</Button>
                     </motion.div>
                   </div>
                 </div>
               ) : (
                 <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
                     {/* Form Container with hover effect */}
                     <div className="relative rounded-[3rem] overflow-hidden group p-8 md:p-10 bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl"
                          onMouseMove={(e) => {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            (e.currentTarget as HTMLElement).style.setProperty('--glow-x', `${x}px`);
                            (e.currentTarget as HTMLElement).style.setProperty('--glow-y', `${y}px`);
                          }}>
                       <div 
                         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[1500ms] rounded-[3rem]"
                         style={{
                           background: `radial-gradient(circle 600px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(16, 185, 129, 0.15), transparent 70%)`
                         }}
                       />

                       <div className="relative z-10 space-y-6">
                         {/* Header */}
                         <div className="mb-8 pb-6 border-b border-white/10">
                           <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Application Form</h2>
                           <p className="text-slate-400 text-sm">Complete your profile to unlock elite professional development pathways.</p>
                         </div>

                         {/* Personal Information Section */}
                         <div className="space-y-4">
                           <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Identity Details</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="name"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormControl>
                                     <Input 
                                       placeholder="Full Name" 
                                       {...field} 
                                       className="h-14 bg-white/5 border border-white/10 rounded-xl text-base hover:border-emerald-500/30 focus:border-emerald-500 transition-colors duration-300"
                                     />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />
                             <FormField
                               control={form.control}
                               name="email"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormControl>
                                     <Input 
                                       placeholder="Email Address" 
                                       type="email"
                                       {...field} 
                                       className="h-14 bg-white/5 border border-white/10 rounded-xl text-base hover:border-emerald-500/30 focus:border-emerald-500 transition-colors duration-300"
                                     />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Contact Section */}
                         <div className="space-y-4 pt-2">
                           <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Contact Information</h3>
                           <FormField
                             control={form.control}
                             name="phone"
                             render={({ field }) => (
                               <FormItem>
                                 <FormControl>
                                   <Input 
                                     placeholder="Phone Number" 
                                     type="tel"
                                     {...field} 
                                     className="h-14 bg-white/5 border border-white/10 rounded-xl text-base hover:border-emerald-500/30 focus:border-emerald-500 transition-colors duration-300"
                                   />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         {/* Course Selection Section */}
                         <div className="space-y-4 pt-2">
                           <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Learning Path</h3>
                           <FormField
                             control={form.control}
                             name="course"
                             render={({ field }) => (
                               <FormItem>
                                 <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                   <FormControl>
                                     <SelectTrigger className="h-14 bg-white/5 border border-white/10 rounded-xl text-base hover:border-emerald-500/30 focus:border-emerald-500 transition-colors duration-300">
                                       <SelectValue placeholder="Select Professional Course" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-slate-900 border border-white/10 text-white rounded-xl">
                                     {ALL_COURSES.map((course) => (
                                       <SelectItem key={course.id} value={course.id} className="focus:bg-emerald-600 focus:text-white rounded-lg">
                                         {course.title}
                                       </SelectItem>
                                     ))}
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         {/* Message Section */}
                         <div className="space-y-4 pt-2">
                           <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Additional Information</h3>
                           <FormField
                             control={form.control}
                             name="message"
                             render={({ field }) => (
                               <FormItem>
                                 <FormControl>
                                   <Textarea 
                                     placeholder="Tell us about your learning goals and why you're interested in this program..." 
                                     className="min-h-[120px] bg-white/5 border border-white/10 rounded-xl text-base resize-none hover:border-emerald-500/30 focus:border-emerald-500 transition-colors duration-300"
                                     {...field} 
                                   />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         {/* Submit Button */}
                         <motion.div
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="pt-4"
                         >
                           <Button 
                             type="submit" 
                             size="lg" 
                             className="w-full h-14 text-lg font-black rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-500/20 transition-all duration-[1500ms] uppercase tracking-widest"
                             disabled={isSubmitting}
                           >
                             {isSubmitting ? (
                               <div className="flex items-center gap-3">
                                 <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                 PROCESSING...
                               </div>
                             ) : (
                               "SUBMIT APPLICATION"
                             )}
                           </Button>
                         </motion.div>
                       </div>
                     </div>
                   </form>
                 </Form>
               )}
             </motion.div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
