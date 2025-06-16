"use client";

import { Box, Typography, Breadcrumbs, Link, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import colors from '@/theme/color';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Twitter } from '@mui/icons-material';


export default function About() {
  const stats = [
    { value: '10.5K', label: 'Sellers active on our site', icon: <PersonOutlineOutlinedIcon /> },
    { value: '33K', label: 'Monthly Product Sale', icon: <MonetizationOnOutlinedIcon />, highlight: true },
    { value: '45.5K', label: 'Customers active on our site', icon: <ShoppingCartOutlinedIcon /> },
    { value: '25K', label: 'Annual gross sale on our site', icon: <TrendingUpIcon /> },
  ];

  const teamMembers = [
    {
      name: 'Tom Cruise',
      title: 'Founder & Chairman',
      image: '/aboutUs/founder.jpg',
      social: [<Twitter />, <InstagramIcon />, <LinkedInIcon />],
    },
    {
      name: 'Emma Watson',
      title: 'Managing Director',
      image: '/aboutUs/director.jpg',
      social: [<TwitterIcon />, <InstagramIcon />, <LinkedInIcon />],
    },
    {
      name: 'Will Smith',
      title: 'Product Designer',
      image: '/aboutUs/designer.jpg',
      social: [<TwitterIcon />, <InstagramIcon />, <LinkedInIcon />],
    },
    {
      name: 'Emma Watson',
      title: 'Managing Director',
      image: '/aboutUs/director.jpg',
      social: [<TwitterIcon />, <InstagramIcon />, <LinkedInIcon />],
    },
  ];

  const services = [
    {
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
      icon: <HeadsetMicOutlinedIcon />,
    },
    {
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
      icon: <LocalAtmOutlinedIcon />,
    },
  ];

  return (
    <Box sx={{ paddingTop: { md: '70px', sm: '30px' }, minHeight: "100vh", px: { xs: '20px' } }}>
      <Box sx={{  paddingLeft: { sm: '50px', md: '150px' },display: 'flex', justifyContent: 'space-between', mb: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link underline="hover" color="black" href="/">
              Home
            </Link>
            <Link underline="hover" color="black" href="/about">
              About
            </Link>
          </Breadcrumbs>
          <Box sx={{ width: { xs: '100%', sm: '85%' } }}>
            <Typography variant="h1" sx={{ fontSize: { xs: '32px', sm: '48px' }, fontWeight: 'bold', mb: 2, color: 'black', paddingTop: { md: '90px' } }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '16px', sm: '18px' }, lineHeight: 1.5, mb: 2, color: 'black', paddingTop: '30px' }}>
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '16px', sm: '18px' }, lineHeight: 1.5, color: 'black' }}>
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '60%' }, mt: { xs: 4, md: 0 } }}>
          <Image
            src="/aboutUs/shopping.jpg"
            alt="e-commerce"
            width={400}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>

      <Box sx={{ padding: { md: '50px' } , mx:"30px"}}>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
              <Box
                sx={{
                  padding: { xs: '5px', sm: '10px', md: '20px' },
                  textAlign: 'center',
                  borderRadius: '4px',
                  border: 'solid 1px',
                  borderColor: 'gray',
                  minHeight: { xs: '120px', sm: '140px', md: '160px' },
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: colors.primary,
                    '& .iconCircle': {
                      backgroundColor: '#faf189',
                    },
                    '& .innerCircle': {
                      backgroundColor: '#fff',
                    },
                    '& .icon': {
                      '& svg': {
                        color: colors.black,
                      },
                    },
                    '& .valueText': {
                      color: '#fff',
                    },
                    '& .labelText': {
                      color: '#fff',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '50px', sm: '60px', md: '80px' },
                    height: { xs: '50px', sm: '60px', md: '80px' },
                    margin: '0 auto',
                    mb: { xs: 1, sm: 2 },
                  }}
                >
                  <Box
                    className="iconCircle"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Box
                    className="innerCircle"
                    sx={{
                      position: 'absolute',
                      width: '70%',
                      height: '70%',
                      backgroundColor: '#000',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box className="icon" sx={{ '& svg': { fontSize: { xs: '20px', sm: '25px', md: '30px' }, color: '#fff' } }}>
                      {stat.icon}
                    </Box>
                  </Box>
                </Box>
                <Typography className="valueText" variant="h3" sx={{ fontSize: { xs: '24px', sm: '30px', md: '40px' }, fontWeight: 'bold', mb: 1, color: 'black' }}>
                  {stat.value}
                </Typography>
                <Typography className="labelText" variant="body2" sx={{ color: 'black', fontSize: { xs: '12px', sm: '14px', md: '17px' } }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: '50px',  mx:{md:'150px'}}}>
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            width: 24px !important;
            height: 24px !important;
            background-size: 12px !important;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 12px !important;
            color: #fff;
          }
        `}</style>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={32}
          slidesPerView={1} 
          breakpoints={{
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          style={{ paddingBottom: '40px' }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: '300px',
                  height: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px',
                  boxSizing: 'border-box',
                }}
              >
                <Box sx={{ flex: '0 1 auto' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={350}
                    style={{ width: '300px', height: '350px', objectFit: 'cover', justifyContent: 'center' }}
                  />
                </Box>
                <Box sx={{ flex: '0 0 auto', justifyContent: 'center',  }}>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: 'bold', color: 'black', fontSize: { xs: '24px', sm: '26px' } }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'black', mb: 1, fontSize: { xs: '14px', sm: '16px' } }}
                  >
                    {member.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'left', gap: 1 }}>
                    {member.social.map((icon, idx) => (
                      <IconButton key={idx} size="small" sx={{ color: 'black' }}>
                        {icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        </Box>
        <Box>

        <Box sx={{ marginTop: '100px',  marginBottom: '100px', mx: { xs: '20px', sm: '50px', md: '100px' } }}>
          <Grid container spacing={2} justifyContent="center">
            {services.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: { xs: '60px', sm: '80px' },
                      height: { xs: '60px', sm: '80px' },
                      margin: '0 auto',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '70%',
                        height: '70%',
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ '& svg': { fontSize: { xs: '24px', sm: '30px' }, color: '#fff' } }}>
                        {service.icon}
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'black', fontSize: { xs: '18px', sm: '20px' } }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black', fontSize: { xs: '14px', sm: '16px' } }}>
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}