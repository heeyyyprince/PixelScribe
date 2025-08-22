import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'
import { fadeInUp } from '../utils/animations'

const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <motion.h2 
                        className="text-3xl sm:text-4xl font-semibold mb-4 text-dark-800"
                        variants={fadeInUp}
                    >
                        Customer Testimonials
                    </motion.h2>
                    <motion.p 
                        className="text-lg text-dark-500 max-w-2xl mx-auto"
                        variants={fadeInUp}
                    >
                        What Our Users Are Saying
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 overflow-hidden relative"
                            variants={fadeInUp}
                            whileHover={{ 
                                y: -10,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-bl-full"></div>
                            
                            <div className="flex items-center mb-6">
                                <div className="mr-4 relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 animate-pulse opacity-50"></div>
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white relative z-10" 
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-dark-800">{testimonial.name}</h3>
                                    <p className="text-primary-600">{testimonial.role}</p>
                                </div>
                            </div>
                            
                            <div className="flex mb-4">
                                {Array(testimonial.stars).fill('').map((_, starIndex) => (
                                    <motion.img 
                                        key={starIndex} 
                                        src={assets.rating_star} 
                                        alt="star rating" 
                                        className="w-5 h-5 mr-1"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * starIndex, duration: 0.3 }}
                                    />
                                ))}
                            </div>
                            
                            <p className="text-dark-600 relative z-10">"{testimonial.text}"</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials