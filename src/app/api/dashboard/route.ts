/**
 * Dashboard API Route
 * GET /api/dashboard - Returns dashboard statistics and data
 */

import { NextResponse } from 'next/server';
import type { DashboardStats } from '@/types/dashboard';

export async function GET() {
  try {
    // In production, fetch from database or external API
    // For now, returning mock data matching Figma design
    const dashboardData: DashboardStats = {
      availableBalance: 10000.0,
      equity: 10660.0,
      marginUsed: 660.0,
      marginFree: 600.0,
      marginLevel: 266.36,
      totalUnrealizedPL: 2304.92,
      timeZone: 'ET',
      currentTime: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'America/New_York',
      }),
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard data',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for updating dashboard preferences
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process dashboard updates (e.g., favorite symbols, layout preferences)
    console.log('Dashboard update:', body);

    return NextResponse.json({
      success: true,
      message: 'Dashboard updated successfully',
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Dashboard update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update dashboard',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}