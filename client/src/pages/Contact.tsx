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

export default function Contact() {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Logic: In a full-stack GRADUATED app, this would call an API.
      // Since we are in React Mockup Mode, we simulate the success.
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Transmission sent to admissions@eaxion.com:", values);
      
      setIsSuccess(true);
      toast({
        title: "Registration Received",
        description: "An email has been dispatched to our intelligence team.",
      });
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
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
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none">CONNECT <br /><span className="text-gradient">WITH US</span></h1>
                
                <div className="space-y-4 mb-12">
                   {socialLinks.map((social, idx) => (
                     <a 
                       key={social.name} 
                       href={social.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 block"
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
               <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                 {isSuccess ? (
                   <div className="text-center py-20">
                     <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                       <Send className="w-10 h-10" />
                     </div>
                     <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Transmission Successful</h2>
                     <Button onClick={() => { setIsSuccess(false); form.reset(); }} className="h-14 px-10 rounded-2xl text-lg font-bold" variant="outline">New Registration</Button>
                   </div>
                 ) : (
                   <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormField
                           control={form.control}
                           name="name"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary">Identity</FormLabel>
                               <FormControl>
                                 <Input placeholder="Full Name" {...field} className="h-16 bg-white/5 border-white/10 rounded-2xl text-lg" />
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
                               <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary">Contact Node</FormLabel>
                               <FormControl>
                                 <Input placeholder="Email Address" {...field} className="h-16 bg-white/5 border-white/10 rounded-2xl text-lg" />
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <FormField
                           control={form.control}
                           name="phone"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary">Direct Line</FormLabel>
                               <FormControl>
                                 <Input placeholder="Phone Number" {...field} className="h-16 bg-white/5 border-white/10 rounded-2xl text-lg" />
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="course"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary">Stream Selection</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                 <FormControl>
                                   <SelectTrigger className="h-16 bg-white/5 border-white/10 rounded-2xl text-lg">
                                     <SelectValue placeholder="Select Course" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                                   {ALL_COURSES.map((course) => (
                                     <SelectItem key={course.id} value={course.id} className="focus:bg-primary focus:text-white rounded-xl">
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

                       <FormField
                         control={form.control}
                         name="message"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel className="text-xs font-bold uppercase tracking-widest text-primary">Brief</FormLabel>
                             <FormControl>
                               <Textarea placeholder="How can we assist your transformation?" className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl text-lg resize-none" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />

                       <Button type="submit" size="lg" className="w-full h-16 text-xl font-black rounded-2xl bg-primary hover:bg-primary/90 transition-all" disabled={isSubmitting}>
                         {isSubmitting ? "PROCESSING..." : "SUBMIT APPLICATION"}
                       </Button>
                     </form>
                   </Form>
                 )}
               </div>
             </motion.div>
           </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
