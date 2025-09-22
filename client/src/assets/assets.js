import logo from './new_pixelscribe_logo.svg'
import logo_icon from './new_pixelscribe_icon.svg'
import pixelscribe_logo_new from './pixelscribe_logo_new.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_male from './profile_male.svg'
import profile_female1 from './profile_female1.svg'
import profile_female2 from './profile_female2.svg'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'

export const assets = {
    logo,
    new_pixelscribe_logo: logo,
    pixelscribe_logo_new,
    logo_icon,
    new_pixelscribe_icon: logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    profile_male,
    profile_female1,
    profile_female2,
    razorpay_logo,
    stripe_logo
}

export const stepsData = [
    {
      title: 'Choose Your Tool',
      description: 'Select from our suite of AI-powered creative tools: Text to Image, Image Enhancer, Background Remover, Style Transfer, Image Colorizer, or Object Remover.',
      icon: step_icon_1,
    },
    {
      title: 'Upload or Create',
      description: 'Either upload your image for processing or describe your vision for AI generation.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Use',
      description: 'Get your professionally processed result in seconds, ready for any project.',
      icon: step_icon_3,
    },
  ];

export const textToImageSteps = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image:profile_male,
        name:'Prince',
        role:'UI/UX Designer',
        stars:5,
        text:`PixelScribe has transformed my design workflow. The AI-generated images are incredibly detailed and save me hours of work on each project.`
    },
    {
        image:profile_female1,
        name:'Sanjana',
        role:'Content Creator',
        stars:5,
        text:`As a content creator, I need high-quality images quickly. PixelScribe delivers exactly what I need with just a text description. Absolutely love it!`
    },
    {
        image:profile_female2,
        name:'Khushi',
        role:'Digital Marketer',
        stars:5,
        text:`PixelScribe has been a game-changer for our marketing campaigns. We can create custom visuals in seconds that perfectly match our brand message.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]