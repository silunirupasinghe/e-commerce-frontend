'use client';
import React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputBase,
  Paper,
  Tabs,
  Tab,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OrderTile from './OrderTitle';
import mockOrders, { OrderType } from '../../../data/mockOrders';

type TabType = {
  label: string;
  value: string;
};

export default function OrdersPage() {
  const tabs: TabType[] = [
    { label: 'All orders', value: 'All' },
    { label: 'Processing', value: 'Processing' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Returns', value: 'Returned' },
  ];

  const [activeTab, setActiveTab] = useState<string>('All');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredOrders: OrderType[] =
    activeTab === 'All'
      ? mockOrders
      : mockOrders.filter((order: OrderType) => order.status === activeTab);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper
          elevation={1}
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 5 },
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Tabs
            value={tabs.findIndex(tab => tab.value === activeTab)}
            onChange={(_, newIndex: number) => setActiveTab(tabs[newIndex].value)}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            sx={{
              mb: 3,
              overflow: 'visible',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.95rem',
                color: '#888',
                minWidth: 'auto',
                px: 2,
                pb: '12px',
              },
              '& .Mui-selected': {
                color: '#000 !important',
                fontWeight: 600,
              },
              '& .MuiTabs-indicator': {
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                height: 3,
                '&::after': {
                  content: '""',
                  display: 'block',
                  width: '15px',
                  height: '4px', // ✅ fixed typo: was '4  px'
                  backgroundColor: '#000',
                  borderRadius: '10px',
                },
              },
            }}
          >
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {/* Welcome + Search */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'flex-end',
              mb: 4,
              mt: { md: '-3rem' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                textAlign: 'right',
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#000',
                  pr: { xs: '4.5rem', md: '6rem' },
                }}
              >
                Welcome!{' '}
                <Box component="span" sx={{ color: '#fbbc04', fontWeight: 600 }}>
                  User
                </Box>
              </Typography>

              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: '100%', md: '300px' },
                }}
              >
                <InputBase
                  placeholder="Item name / Order ID / Tracking No."
                  sx={{
                    width: '100%',
                    padding: '0.6rem 2.2rem 0.6rem 1rem',
                    border: '1px solid #ccc',
                    borderRadius: '999px',
                    backgroundColor: '#fff',
                    fontSize: '0.95rem',
                    color: '#333',
                  }}
                />
                <SearchIcon
                  sx={{
                    position: 'absolute',
                    right: '0.8rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1rem',
                    color: '#000',
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Orders */}
          <Box>
            {filteredOrders.length > 0 ? (
              <Stack spacing={3}>
                {filteredOrders.map((order, i) => (
                  <OrderTile key={i} order={order} />
                ))}
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'center', color: '#777', py: 6 }}>
                <Box sx={{ fontSize: '3rem', mb: 1 }}>🗒</Box>
                <Typography sx={{ fontSize: '0.95rem', color: '#888' }}>
                  No orders in{' '}
                  <strong>{tabs.find(t => t.value === activeTab)?.label}</strong>. Please{' '}
                  <Box component="span" sx={{ color: '#000', fontWeight: 600 }}>
                    switch account
                  </Box>{' '}
                  or{' '}
                  <Box component="span" sx={{ color: '#000', fontWeight: 600 }}>
                    feedback
                  </Box>
                  .
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
