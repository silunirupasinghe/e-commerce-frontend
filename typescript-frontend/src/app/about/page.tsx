"use client";

import { useState } from 'react';
import { Box, Typography, Breadcrumbs, Link, Grid, IconButton, Fab, TextField, Button } from '@mui/material';
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
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

export default function About() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

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
      image: '/images/founder.webp',
      social: [<TwitterIcon />, <InstagramIcon />, <LinkedInIcon />],
    },
    {
      name: 'Emma Watson',
      title: 'Managing Director',
      image: '/images/director.webp',
      social: [<TwitterIcon />, <InstagramIcon />, <LinkedInIcon />],
    },
    {
      name: 'Will Smith',
      title: 'Product Designer',
      image: '/images/designer.webp',
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

  const handleClick = (index: number) => {
  setClickedIndex(index === clickedIndex ? null : index); // Toggle clicked state
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };  

  return (
    <Box sx={{paddingLeft: '150px', paddingTop: '70px', backgroundColor: "#fff", minHeight: "100vh" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
      <Box sx={{ width: '50%' }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="black" href="/">
            Home
          </Link>
          <Link underline="hover" color="black" href="/about">
            About
          </Link>
        </Breadcrumbs>
        <Box sx={{ width: '85%' }}>
        <Typography variant="h1" sx={{ fontSize: '48px', fontWeight: 'bold', mb: 2, color: 'black', paddingTop: '90px' }}>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.5, mb: 2, color:'black', paddingTop: '30px' }}>
          Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '18px', lineHeight: 1.5, color: 'black' }}>
          Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
        </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '60%' }}>
        <Image
          src="/images/image1.webp"
          alt="e-commerce"
          width={400}
          height={500}
          style={{ width: '100%', height: '110%' }}
        />
      </Box>
      </Box>

    <Box sx={{ padding: '50px', paddingRight: '140px'}}>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid size={{xs:12, sm:6, md:3}} key={index}>
            <Box
              onClick={() => handleClick(index)}
              sx={{
                marginTop: '70px',
                padding: '25px',
                textAlign: 'center',
                backgroundColor: clickedIndex === index ? '#ffca28' : '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: 'solid 1px',
                borderColor: 'gray'
                
              }}
            >
              <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80px',
                    height: '80px',
                    margin: '0 auto',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: clickedIndex === index ? '#faf189' : '#e0e0e0',
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
                      backgroundColor: clickedIndex === index ? '#fff' : '#000', 
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ '& svg': { fontSize: '30px', color: clickedIndex === index ? '#000': '#fff', }, }}>{stat.icon}</Box>
                  </Box>
                </Box>
              <Typography variant="h3" sx={{ fontSize: '48px', fontWeight: 'bold', mb: 1, color: clickedIndex === index ? '#fff': 'black', }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: clickedIndex === index ? '#fff': 'black', fontSize: '17px' }}>
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    
    <Box sx={{ marginTop: '50px', paddingLeft: '100px', overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        <Box sx={{ display: 'flex', gap: 4, minWidth: 'max-content' }}>
          {teamMembers.map((member, index) => (
            <Box key={index} sx={{ textAlign: 'center', minWidth: '300px', paddingRight: '50px' }}>
              <Image
                src={member.image}
                alt={member.name}
                width={250}
                height={500}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'black', fontSize: '30px' }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', mb: 1, fontSize: '16px' }}>
                {member.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {member.social.map((icon, idx) => (
                  <IconButton key={idx} size="small" sx={{ color: 'black' }}>
                    {icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginTop: '150px', paddingRight: '200px', marginBottom: '100px'}}>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid size={{xs:12, sm:6, md:4}} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80px',
                    height: '80px',
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
                    <Box sx={{ '& svg': { fontSize: '30px', color: '#fff' } }}>
                      {service.icon}
                    </Box>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'black' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {service.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Fab
        color="primary"
        onClick={handleChatToggle}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#ffca28',
          '&:hover': { backgroundColor: '#ffb300' },
        }}
      >
        <CommentOutlinedIcon />
      </Fab>

      {isChatOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: 'black', padding: '20px' }}>
            Chat with Us
          </Typography>
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map((message, index) => (
              <Box key={index} sx={{ mb: 1, p: 1, backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                {message}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      )}

  </Box>
  </Box>
  
  );
}