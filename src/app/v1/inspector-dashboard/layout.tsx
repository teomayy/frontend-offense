import type { PropsWithChildren } from 'react'

import InspectorDashboardLayout from '@/components/inspector-dashboard-layout/InspectorDashboardLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <InspectorDashboardLayout>{children}</InspectorDashboardLayout>
}
