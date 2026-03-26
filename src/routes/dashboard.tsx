import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { GraduationCap, TrendingUp, Briefcase, Lock } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return <Outlet />
}
