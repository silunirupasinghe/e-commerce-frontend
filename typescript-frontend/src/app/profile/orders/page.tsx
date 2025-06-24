'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputBase,
  Paper,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OrderTile from './OrderTitle';
import colors from '@/theme/color';
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
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredOrders: OrderType[] = mockOrders
    .filter((order: OrderType) =>
      activeTab === 'All' || order.status === activeTab
    )
    .filter((order: OrderType) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;

      const idMatch = order.id.toLowerCase().includes(term);
      const trackingMatch = order.trackingNumber.toLowerCase().includes(term);
      const itemMatch = order.items.some(item =>
        item.name.toLowerCase().includes(term)
      );

      return idMatch || trackingMatch || itemMatch;
    });

  return (
    <Box sx={{ bgcolor: colors.white, minHeight: '100vh', p: 0, m: 0 }}>
      <Box
        sx={{
          width: '100%',
          px: { xs: 2, sm: 4 },
          boxSizing: 'border-box',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: colors.white,
            borderRadius: '10px',
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 5 },
            boxShadow: 'none',
            width: '100%',
          }}
        >
          {/* Tabs */}
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
                color: colors.textGray,
                minWidth: 'auto',
                px: 2,
                pb: '12px',
                '&.Mui-selected': {
                  color: colors.black,
                  fontWeight: 600,
                },
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
                  height: '4px',
                  backgroundColor: colors.black,
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
                  color: colors.black,
                  pr: { xs: '4.5rem', md: '6rem' },
                }}
              >
                Welcome!{' '}
                <Box component="span" sx={{ color: colors.primary, fontWeight: 600 }}>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    width: '100%',
                    padding: '0.35rem 2rem 0.35rem 1rem',
                    border: '1px solid',
                    borderColor: colors.gray,
                    borderRadius: '999px',
                    backgroundColor: colors.white,
                    fontSize: '0.9rem',
                    color: colors.Gray,
                  }}
                />
                <SearchIcon
                  sx={{
                    position: 'absolute',
                    right: '0.8rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1rem',
                    color: colors.black,
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
              <Box sx={{ textAlign: 'center', color: colors.textGray, py: 6 }}>
                <Box sx={{ fontSize: '3rem', mb: 1 }}>🗒</Box>
                <Typography sx={{ fontSize: '0.95rem', color: colors.textGray }}>
                  No orders found. Please{' '}
                  <Box component="span" sx={{ color: colors.black, fontWeight: 600 }}>
                    try another search
                  </Box>{' '}
                  or{' '}
                  <Box component="span" sx={{ color: colors.black, fontWeight: 600 }}>
                    switch tabs
                  </Box>
                  .
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
